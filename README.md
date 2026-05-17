<div align="center">

# 🎟️ HotTicket

### *Compra tu entrada, vive el momento*

[![Estat](https://img.shields.io/badge/Estat-En%20Desenvolupament-yellow)](https://github.com/XiscoRossello/hotticket)
[![Versió](https://img.shields.io/badge/Versió-1.0.0-blue)](https://github.com/XiscoRossello/hotticket)
[![Llicència](https://img.shields.io/badge/Llicència-MIT-green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)](https://supabase.com/)

</div>

---

## 📖 Descripció del Projecte

**HotTicket** és una plataforma web per a la **venda i gestió d'entrades d'esdeveniments**. Permet als usuaris descobrir events propers, comprar les seves entrades al moment i accedir ràpidament al recinte amb un codi QR. Els organitzadors poden gestionar els seus eventos, veure estadístiques de venda i escanejar entrades en temps real.

### 🎭 El Problema

Els organitzadors d'events (discoteques, festivals, concerts, festes privades) necessiten una forma àgil de **vendre entrades anticipades** i **controlar l'accés** al recinte sense cues ni efectiu. Els assistents, d'altra banda, volen comprar la seva entrada en segons des del mòbil.

### 💡 La Solució

HotTicket connecta organitzadors i assistents en una sola plataforma:

- **Assistents** descobreixen events propers per geolocalització, compren entrades amb uns pocs clics i les guarden a la seva cartera digital com a codi QR personal.
- **Organitzadors** (rol *commerce*) gestionen els seus events i productes des d'un backoffice, escanegen les entrades a l'entrada del recinte, i visualitzen on s'han escanejat les entrades en un mapa de calor.
- **Admins** gestionen la totalitat de la plataforma: usuaris, comercis, events, productes i comandes.

---

## 🚧 Estat Actual

> **Fase actual:** Desenvolupament Avançat (Maig 2026)

| Aspecte | Detall |
|---------|--------|
| 📌 Versió | 1.0.0 - Maig 2026 |
| ⚙️ Progrés | Plataforma funcional amb totes les característiques principals implementades |
| 🚀 Desplegament | Vercel + Supabase |
| 🧪 Mode Test | Simulació de pagaments sense Stripe configurat |

---

## ✨ Funcionalitats Implementades

### 👤 Gestió d'Usuaris
- ✅ Registre amb email i contrasenya
- ✅ Autenticació segura amb Supabase Auth
- ✅ Perfils d'usuari amb rols (client, commerce, admin)
- ✅ Historial de compres

### 🔍 Descobriment d'Esdeveniments
- ✅ Pàgina principal amb llistat d'events actius
- ✅ Geolocalització per mostrar events propers
- ✅ Cerca d'events per nom, adreça o organitzador
- ✅ Informació detallada de cada event (data, ubicació, imatge)

### 🎟️ Compra d'Entrades
- ✅ Selecció de tipus d'entrada amb quantitats
- ✅ Carret de compra persistent (Zustand)
- ✅ Checkout integrat amb Stripe (o mode simulació)
- ✅ Confirmació de pagament instantània

### 📱 Cartera Digital
- ✅ Codi QR personal únic per usuari
- ✅ Visualització de totes les entrades comprades
- ✅ Agrupació d'entrades per event
- ✅ Estat de les entrades (disponible / bescanviada)

### 🔍 Escàner QR per a Organitzadors
- ✅ Escaneig de codis QR amb la càmera del dispositiu
- ✅ Validació d'entrades en temps real
- ✅ Marcatge d'entrades com a bescanviades
- ✅ Historial de bescanvis

### 🎛️ Backoffice per a Organitzadors
- ✅ Gestió de productes/entrades (CRUD complet)
- ✅ Gestió d'esdeveniments (CRUD complet)
- ✅ Configuració del comerç (nom, logo, adreça, coordenades)
- ✅ Dashboard amb estadístiques de venda
- ✅ **Mapa de calor** — visualitza on s'han escanejat les entrades al recinte en temps real

### 🛡️ Panell d'Administració
- ✅ Gestió d'usuaris i rols
- ✅ Gestió de comercis
- ✅ Gestió d'esdeveniments
- ✅ Gestió de productes
- ✅ Historial de comandes global
- ✅ Dashboard amb mètriques globals

---

## 🛠️ Stack Tecnològic

### Frontend
| Tecnologia | Descripció |
|------------|------------|
| **Next.js 16** | Framework React amb App Router i TypeScript |
| **Tailwind CSS** | Estils amb tema fosc personalitzat |
| **Zustand** | Gestió d'estat del carret de compra |
| **Lucide React** | Biblioteca d'icones |
| **html5-qrcode** | Escaneig de codis QR |
| **qrcode** | Generació de codis QR |
| **Leaflet + Leaflet.heat** | Mapes interactius i mapa de calor |

### Backend
| Tecnologia | Descripció |
|------------|------------|
| **Supabase** | Backend-as-a-Service |
| **PostgreSQL** | Base de dades relacional |
| **Row Level Security** | Polítiques de seguretat a nivell de fila |
| **Auth** | Autenticació d'usuaris |
| **Stripe** | Processament de pagaments (opcional) |

### Infraestructura
| Servei | Ús |
|--------|-----|
| **Vercel** | Desplegament i hosting |
| **Supabase Cloud** | Base de dades i autenticació |
| **GitHub** | Control de versions |

---

## 📁 Estructura del Projecte

```
src/
├── app/
│   ├── admin/              # Panell d'administració
│   │   ├── users/          # Gestió d'usuaris
│   │   ├── commerces/      # Gestió de comercis
│   │   ├── events/         # Gestió d'esdeveniments
│   │   ├── products/       # Gestió de productes
│   │   └── orders/         # Historial de comandes
│   ├── api/
│   │   ├── checkout/       # API de checkout (Stripe)
│   │   └── webhook/        # Webhook de Stripe
│   ├── auth/
│   │   ├── login/          # Pàgina de login
│   │   ├── register/       # Pàgina de registre
│   │   └── callback/       # Callback OAuth
│   ├── backoffice/         # Panell de l'organitzador
│   │   ├── products/       # CRUD tipus d'entrades
│   │   ├── events/         # CRUD esdeveniments
│   │   ├── commerce/       # Configuració del comerç
│   │   └── heatmap/        # Mapa de calor d'escaneos
│   ├── checkout/           # Procés de pagament
│   │   ├── success/        # Pagament exitós
│   │   └── cancel/         # Pagament cancel·lat
│   ├── event/[id]/         # Detall d'esdeveniment + compra
│   ├── scanner/            # Escàner QR d'entrades
│   ├── wallet/             # Cartera digital de l'usuari
│   └── page.tsx            # Home — descobriment d'events
├── components/
│   ├── Navbar.tsx          # Navegació
│   ├── CartDrawer.tsx      # Carret lateral
│   ├── HeatmapClient.tsx   # Component de mapa de calor
│   └── LoadingSpinner.tsx  # Spinner de càrrega
├── lib/
│   ├── supabase/           # Clients Supabase (browser + server)
│   ├── stripe.ts           # Configuració Stripe
│   └── types.ts            # Tipus TypeScript
├── store/
│   └── cart.ts             # Store Zustand del carret
└── middleware.ts           # Middleware d'autenticació
```

---

## 🔧 Instal·lació

### Requisits Previs
- Node.js 18+
- Compte de Supabase
- Compte de Stripe (opcional, per pagaments reals)

### Passos

1. **Clona el repositori:**
```bash
git clone https://github.com/XiscoRossello/hotticket.git
cd hotticket
npm install
```

2. **Configura les variables d'entorn** a `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (opcional - sense configurar s'activa mode simulació)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# URL de l'aplicació
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Executa les migracions** a Supabase SQL Editor:
   - Copia el contingut de `supabase/migrations/` i executa'l

4. **Inicia el servidor de desenvolupament:**
```bash
npm run dev
```

5. **Obre** [http://localhost:3000](http://localhost:3000)

---

## 🧪 Mode Simulació (Sense Stripe)

Quan `STRIPE_SECRET_KEY` no està configurat o té el valor per defecte, l'aplicació funciona en **mode simulació**:

- Els pagaments es processen instantàniament
- No cal introduir dades de targeta
- Les entrades s'afegeixen directament a la cartera digital
- Perfecte per a proves i desenvolupament

---

## 🔑 Comptes de Prova

Pots utilitzar els següents comptes per provar l'aplicació sense necessitat de registrar-te:

| Rol | Email | Contrasenya | Accés |
|-----|-------|-------------|-------|
| 👤 **Client** | `user@hotticket.app` | `password123` | Descobrir events, comprar entrades, cartera digital |
| 🏪 **Commerce** | `commerce@hotticket.app` | `password123` | Tot el d'anterior + backoffice, escàner QR, mapa de calor |
| 🛡️ **Admin** | `admin@hotticket.app` | `password123` | Accés total a la plataforma |

> [!NOTE]
> Els pagaments funcionen en **mode simulació** — no cal cap targeta de crèdit real per provar el flux de compra complet.

---

## 🎨 Paleta de Colors


| Color | Hex | Ús |
|-------|-----|-----|
| **Primary** | `#8400D6` | Color principal (lila) |
| **Primary Light** | `#9341EA` | Variació clara |
| **Accent** | `#FF6600` | Color d'accent (taronja) |
| **Accent Light** | `#F5A300` | Variació clara |
| **Background** | `#0A0A0A` | Fons principal |
| **Surface** | `#1A1A1A` | Superfícies |
| **Border** | `#2A2A2A` | Vores |

---

## 👥 Rols d'Usuari

| Rol | Permisos |
|-----|----------|
| **client** | Veure events, comprar entrades, usar cartera digital |
| **commerce** | Tot de client + gestionar events/entrades, escanejar QR, veure mapa de calor |
| **admin** | Accés total al sistema |

---

## 📅 Full de Ruta (Roadmap)

| Període | Tasques | Estat |
|---------|---------|-------|
| 🍂 **Oct - Des 2025** | Anàlisi, disseny i prototips | ✅ Completat |
| 🎄 **Nadal 2025** | Configuració del projecte i funcionalitats bàsiques | ✅ Completat |
| 🌱 **Gen - Feb 2026** | Desenvolupament avançat, integració de pagaments | ✅ Completat |
| 🧪 **Mar - Abr 2026** | Proves, optimització i millores | ✅ Completat |
| 🎓 **Maig 2026** | Entrega final i defensa del projecte | 🔄 En progrés |

---

## 👥 Equip

<table>
  <tr>
    <td align="center">
      <strong>👨‍💻 Autors</strong><br/>
      Francisco Javier Rosselló Jerónimo<br/>
      Ferran Azpiazu Adrover
    </td>
    <td align="center">
      <strong>👨‍🏫 Tutor</strong><br/>
      Miquel Antoni Capellà Arrom
    </td>
    <td align="center">
      <strong>🏫 Centre</strong><br/>
      CIFP Francesc de Borja Moll
    </td>
  </tr>
</table>

---

## 📂 Documentació del Projecte - UD1A

| Document | Descripció | Enllaç |
|----------|------------|--------|
| 📅 **Planificació** | Revisió i ajust de la planificació inicial | [docs/PLANIFICACIO.md](docs/PLANIFICACIO.md) |
| 📘 **Memòria Tècnica** | Arquitectura, decisions tècniques i implementació detallada | [docs/MEMORIA_TECNICA.md](docs/MEMORIA_TECNICA.md) |
| 🚀 **Guia d'Instal·lació** | Guia pas a pas per instal·lar i configurar el projecte | [docs/GUIA_INSTALLACIO.md](docs/GUIA_INSTALLACIO.md) |

---

## 📝 Llicència

Aquest projecte està sota la llicència MIT. Consulta l'arxiu [LICENSE](LICENSE) per a més detalls.

---

<div align="center">

**Fet amb ❤️ a les Illes Balears**

[Reportar un error](https://github.com/XiscoRossello/hotticket/issues) · [Sol·licitar funcionalitat](https://github.com/XiscoRossello/hotticket/issues)

</div>
