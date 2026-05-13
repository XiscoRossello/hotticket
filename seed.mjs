import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pczzpklqfzmellzrvjzx.supabase.co';
const supabaseKey = 'your_service_role_key_here';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  console.log('--- Iniciando creación de datos de prueba ---');

  // 1. Crear usuarios
  const usersToCreate = [
    { email: 'admin@hotticket.app', password: 'password123', role: 'admin', name: 'Administrador' },
    { email: 'commerce@hotticket.app', password: 'password123', role: 'commerce', name: 'Dueño Hot Club' },
    { email: 'user@hotticket.app', password: 'password123', role: 'client', name: 'Cliente Vip' }
  ];

  const userIds = {};

  for (const u of usersToCreate) {
    console.log(`Creando usuario ${u.email}...`);
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true
    });
    
    if (error) {
      if (error.message.includes('already')) {
        console.log(`El usuario ${u.email} ya existe.`);
        // Recuperar ID
        const { data: existing } = await supabase.from('profiles').select('id').eq('email', u.email).single();
        if (existing) userIds[u.role] = existing.id;
      } else {
        console.error('Error creando usuario:', error.message);
      }
    } else {
      userIds[u.role] = data.user.id;
    }
  }

  // Esperar un segundo para asegurar que el trigger creó los perfiles
  await new Promise(r => setTimeout(r, 2000));

  // 2. Actualizar perfiles
  console.log('Actualizando roles de los perfiles...');
  for (const u of usersToCreate) {
    if (userIds[u.role]) {
      await supabase.from('profiles').update({
        role: u.role,
        full_name: u.name
      }).eq('id', userIds[u.role]);
    }
  }

  const commerceUserId = userIds['commerce'];

  // 3. Crear Comercio
  let commerceId = null;
  if (commerceUserId) {
    console.log('Creando comercio...');
    const { data: existingCommerce } = await supabase.from('commerces').select('id').eq('owner_id', commerceUserId).single();
    if (existingCommerce) {
      commerceId = existingCommerce.id;
    } else {
      const { data: commerce, error: commError } = await supabase.from('commerces').insert({
        owner_id: commerceUserId,
        name: 'Hot Club Ibiza',
        description: 'El mejor club techno de la isla.',
        address: 'Playa d en Bossa, Ibiza',
        logo_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80'
      }).select().single();
      if (commError) console.error('Error comercio:', commError);
      else commerceId = commerce.id;
    }
  }

  // 4. Crear Eventos
  let eventIds = [];
  if (commerceId) {
    console.log('Creando eventos...');
    const events = [
      {
        commerce_id: commerceId,
        title: 'Neon Techno Party',
        description: 'La fiesta techno más exclusiva del verano con luces de neón naranjas y rojas.',
        start_date: new Date(Date.now() + 86400000 * 2).toISOString(), // +2 días
        end_date: new Date(Date.now() + 86400000 * 2 + 14400000).toISOString(),
        address: 'Sala Principal, Hot Club Ibiza',
        image_url: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80',
        is_active: true,
        latitude: 38.882,
        longitude: 1.405
      },
      {
        commerce_id: commerceId,
        title: 'Sunset Open Air',
        description: 'Música en directo bajo las estrellas. Siente el calor.',
        start_date: new Date(Date.now() + 86400000 * 5).toISOString(), // +5 días
        end_date: new Date(Date.now() + 86400000 * 5 + 14400000).toISOString(),
        address: 'Terraza, Hot Club Ibiza',
        image_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
        is_active: true,
        latitude: 38.882,
        longitude: 1.405
      }
    ];

    const { data: evtData, error: evtErr } = await supabase.from('events').insert(events).select();
    if (evtErr) console.error('Error eventos:', evtErr);
    else {
      eventIds = evtData.map(e => e.id);
    }
  }

  // 5. Crear Entradas (Productos)
  if (eventIds.length > 0) {
    console.log('Creando entradas para los eventos...');
    const productsToInsert = [];
    
    // Entradas para Neon Techno
    productsToInsert.push({
      commerce_id: commerceId,
      name: 'Entrada General',
      description: 'Acceso a pista principal',
      price: 25.00,
      image_url: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=400&q=80',
      is_available: true
    });
    productsToInsert.push({
      commerce_id: commerceId,
      name: 'Entrada VIP',
      description: 'Acceso rápido sin colas y zona VIP',
      price: 60.00,
      image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
      is_available: true
    });

    // Entradas para Sunset Open Air
    productsToInsert.push({
      commerce_id: commerceId,
      name: 'Entrada Early Bird',
      description: 'Acceso antes de las 20:00',
      price: 15.00,
      image_url: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=400&q=80',
      is_available: true
    });

    const { data: prodsData, error: prodErr } = await supabase.from('products').insert(productsToInsert).select();
    if (prodErr) console.error('Error productos:', prodErr);
    else {
        // Link to events
        const eventProducts = [];
        eventProducts.push({ event_id: eventIds[0], product_id: prodsData[0].id });
        eventProducts.push({ event_id: eventIds[0], product_id: prodsData[1].id });
        eventProducts.push({ event_id: eventIds[1], product_id: prodsData[2].id });
        const { error: epErr } = await supabase.from('event_products').insert(eventProducts);
        if (epErr) console.error('Error linkeando productos:', epErr);
    }
  }

  console.log('--- ¡Datos de prueba generados con éxito! ---');
}

main().catch(console.error);
