# ✈️ DACE - Diagnostic Aéroportuaire et Contrôle des Espaces

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma)

## 📋 Description

**DACE** est une application web moderne de gestion et de diagnostic d'infrastructures aéroportuaires. Elle permet de créer, gérer et analyser des diagnostics détaillés des composantes physiques et fonctionnelles des aéroports.

### 🎯 Fonctionnalités Principales

- ✅ **Création de diagnostics** : Formulaire complet avec validation
- ✅ **Dashboard analytique** : Statistiques et vue d'ensemble
- ✅ **Liste des diagnostics** : Consultation de tous les diagnostics enregistrés
- ✅ **Navigation moderne** : Sidebar avec accès rapide
- ✅ **Validation robuste** : Zod pour validation côté serveur
- ✅ **Interface moderne** : UI/UX avec Tailwind CSS et support du mode sombre
- 🔜 **FlyRadar** : Suivi des vols en temps réel (à venir)

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ ou supérieur
- PostgreSQL 14+
- pnpm (recommandé) ou npm

### Installation

```bash
# 1. Cloner le projet (ou utiliser le dossier existant)
cd dace-projet

# 2. Installer les dépendances
pnpm install

# 3. Configurer la base de données
# Créer un fichier .env avec :
DATABASE_URL="postgresql://user:password@localhost:5432/dace"

# 4. Générer le client Prisma
pnpm prisma generate

# 5. Appliquer les migrations
pnpm prisma migrate dev

# 6. Lancer le serveur de développement
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](./QUICKSTART.md) | Guide de démarrage rapide et commandes |
| [STRUCTURE.md](./STRUCTURE.md) | Architecture et arborescence du projet |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Résumé détaillé de l'implémentation |
| [TESTING_GUIDE.md](./TESTING_GUIDE.md) | Guide complet pour tester l'application |
| [docs/DIAGNOSTIC_FEATURE.md](./docs/DIAGNOSTIC_FEATURE.md) | Documentation technique détaillée |

## 🏗️ Architecture Technique

### Stack Technologique

- **Framework** : Next.js 15 (App Router)
- **UI Library** : React 19
- **Langage** : TypeScript 5
- **Styling** : Tailwind CSS v4
- **Base de données** : PostgreSQL
- **ORM** : Prisma 6
- **Validation** : Zod
- **Déploiement** : Vercel (recommandé)

### Structure du Projet

```
dace-projet/
├── app/                    # Pages et routes Next.js
│   ├── actions/           # Server Actions
│   ├── dashboard/         # Page Dashboard
│   ├── diagnostic/        # Page Diagnostic
│   └── flyradar/          # Page FlyRadar
├── components/            # Composants React réutilisables
├── lib/                   # Utilitaires et configurations
│   └── validations/       # Schémas de validation Zod
├── prisma/               # Schéma et migrations DB
└── docs/                 # Documentation
```

## 🎨 Captures d'écran

### Dashboard
Vue d'ensemble avec statistiques en temps réel et derniers diagnostics.

### Formulaire de Diagnostic
Interface intuitive pour créer des diagnostics complets avec validation en temps réel.

### Navigation Sidebar
Navigation moderne avec indicateur de page active et support du mode sombre.

## 📊 Modèle de Données

### Table Diagnostic

| Champ | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Identifiant unique |
| `nomAeroport` | String | Nom de l'aéroport ⚠️ Requis |
| `localisation` | String | Localisation géographique ⚠️ Requis |
| `dateDiagnostic` | DateTime | Date du diagnostic ⚠️ Requis |
| `pistes` | String? | Description des pistes |
| `terminaux` | String? | Description des terminaux |
| `postesAeronefs` | String? | Description des postes aéronefs |
| `tourControle` | String? | Description de la tour de contrôle |
| `fluxPassagers` | String? | Description des flux passagers |
| `equipementsSecurite` | String? | Description des équipements de sécurité |
| `servicesTechniques` | String? | Description des services techniques |
| `notesObservation` | String? | Notes d'observation (texte libre) |

## 🔧 Commandes Utiles

```bash
# Développement
pnpm dev              # Lancer le serveur de développement

# Build
pnpm build            # Compiler pour la production
pnpm start            # Lancer en mode production

# Base de données
pnpm prisma studio    # Ouvrir l'interface Prisma Studio
pnpm prisma generate  # Générer le client Prisma
pnpm prisma migrate dev  # Créer/appliquer une migration

# Qualité du code
pnpm lint             # Linter le code
pnpm type-check       # Vérifier les types TypeScript
```

## 🌟 Fonctionnalités Clés

### Server Actions

Les **Server Actions** de Next.js 15 permettent des mutations de données sans créer de routes API.

```typescript
// Exemple d'utilisation
const result = await createDiagnostic(formData);
if (result.success) {
  console.log("Diagnostic créé:", result.data);
}
```

### Validation Zod

Validation stricte côté serveur avec messages d'erreur personnalisés :

```typescript
const diagnosticSchema = z.object({
  nomAeroport: z.string().min(2).max(100),
  localisation: z.string().min(2).max(200),
  dateDiagnostic: z.coerce.date(),
  // ... autres champs
});
```

### Interface Moderne

- 🎨 Design moderne avec Tailwind CSS
- 🌙 Support complet du mode sombre
- 📱 Responsive (mobile, tablette, desktop)
- ♿ Accessible (ARIA, semantic HTML)
- ⚡ Performance optimisée

## 🔐 Sécurité

- ✅ Validation serveur obligatoire (Zod)
- ✅ Échappement automatique des données (Prisma)
- ✅ Server Actions sécurisées
- ✅ Variables d'environnement pour secrets
- ✅ Pas d'exposition des données sensibles

## 📈 Évolutions Futures

### Court Terme
- [ ] Édition de diagnostics existants
- [ ] Suppression de diagnostics
- [ ] Recherche et filtres avancés
- [ ] Export PDF des diagnostics
- [ ] Pagination de la liste

### Moyen Terme
- [ ] Authentification utilisateurs
- [ ] Rôles et permissions
- [ ] Upload de photos/documents
- [ ] Graphiques et statistiques avancées
- [ ] Historique des modifications

### Long Terme
- [ ] Module FlyRadar complet
- [ ] API REST publique
- [ ] Application mobile (React Native)
- [ ] Intégration IA pour analyse
- [ ] Multi-aéroports avec relations

## 🤝 Contribution

Le code est structuré de manière modulaire pour faciliter les contributions :

1. **Code propre** : TypeScript strict, commentaires JSDoc
2. **Components réutilisables** : Séparation des responsabilités
3. **Validation robuste** : Zod pour type-safety
4. **Tests** : Structure prête pour Jest/Vitest

## 📝 License

Ce projet est développé dans un cadre éducatif/professionnel.

## 👥 Auteur

Développé avec ❤️ pour la gestion moderne des infrastructures aéroportuaires.

---

## 🆘 Support & Questions

Pour toute question ou problème :

1. Consultez la [documentation](./docs/DIAGNOSTIC_FEATURE.md)
2. Vérifiez le [guide de test](./TESTING_GUIDE.md)
3. Examinez les [exemples d'implémentation](./IMPLEMENTATION_SUMMARY.md)

---

## 📅 Changelog

### Version 1.0.0 (2024-11-01)

✨ **Fonctionnalités initiales**
- Création de diagnostics avec validation Zod
- Dashboard avec statistiques
- Interface moderne avec Tailwind CSS
- Navigation sidebar
- Support du mode sombre
- Documentation complète

🔧 **Technique**
- Next.js 15 avec App Router
- Server Actions pour mutations
- Prisma ORM pour PostgreSQL
- TypeScript strict mode
- Architecture modulaire

---

**Bonne utilisation ! 🚀**
