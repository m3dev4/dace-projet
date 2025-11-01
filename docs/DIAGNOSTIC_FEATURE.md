# Fonctionnalité de Diagnostic Aéroportuaire

## 📋 Vue d'ensemble

Cette fonctionnalité permet de créer et gérer des diagnostics d'infrastructures aéroportuaires via une interface moderne et intuitive.

## 🏗️ Architecture

### Structure des fichiers

```
app/
├── actions/
│   └── diagnostic.ts          # Server Actions pour la gestion des diagnostics
├── dashboard/
│   ├── layout.tsx             # Layout avec sidebar
│   └── page.tsx               # Page du dashboard
├── diagnostic/
│   ├── layout.tsx             # Layout avec sidebar
│   └── page.tsx               # Page de création/liste des diagnostics
└── flyradar/
    ├── layout.tsx             # Layout avec sidebar
    └── page.tsx               # Page placeholder pour FlyRadar

components/
├── sidebar.tsx                # Composant de navigation latérale
└── diagnostic-form.tsx        # Formulaire de création de diagnostic

lib/
├── validations/
│   └── diagnostic.ts          # Schéma de validation Zod
├── utils.ts                   # Utilitaires (cn pour classes CSS)
└── prisma.ts                  # Client Prisma
```

## 🔑 Fonctionnalités

### 1. Server Actions

**Fichier**: `app/actions/diagnostic.ts`

- **`createDiagnostic()`**: Création d'un nouveau diagnostic avec validation Zod
- **`getDiagnostics()`**: Récupération de tous les diagnostics
- **`getDiagnosticById()`**: Récupération d'un diagnostic par ID

```typescript
// Exemple d'utilisation
const result = await createDiagnostic(formData);
if (result.success) {
  console.log("Diagnostic créé:", result.data);
}
```

### 2. Validation avec Zod

**Fichier**: `lib/validations/diagnostic.ts`

Schéma de validation complet avec :
- Champs obligatoires : `nomAeroport`, `localisation`, `dateDiagnostic`
- Champs optionnels : composantes physiques et fonctionnelles
- Limites de caractères pour chaque champ
- Messages d'erreur personnalisés en français

### 3. Formulaire de Diagnostic

**Fichier**: `components/diagnostic-form.tsx`

Caractéristiques :
- Interface moderne avec Tailwind CSS
- Validation côté client et serveur
- Gestion des états (loading, erreurs, succès)
- Organisation en sections logiques
- Support du mode sombre

### 4. Sidebar de Navigation

**Fichier**: `components/sidebar.tsx`

Navigation entre :
- 📊 Dashboard
- 📋 Diagnostic
- ✈️ FlyRadar

## 🎨 UI/UX

### Design System

- **Couleurs principales**: Bleu (#3B82F6)
- **Palettes**: zinc pour le texte et les bordures
- **Typographie**: Geist Sans et Geist Mono
- **Mode sombre**: Support complet

### Composants

- Cards avec bordures arrondies (`rounded-lg`)
- Boutons avec états hover et disabled
- Inputs avec focus states
- Messages de validation inline
- Loading spinners animés

## 📊 Modèle de données

**Table**: `Diagnostic`

```prisma
model Diagnostic {
  id                    String   @id @default(cuid())
  nomAeroport          String
  localisation         String
  
  // Composantes physiques
  pistes               String?
  terminaux            String?
  postesAeronefs       String?
  tourControle         String?
  
  // Composantes fonctionnelles
  fluxPassagers        String?
  equipementsSecurite  String?
  servicesTechniques   String?
  
  // Observations
  notesObservation     String?
  dateDiagnostic       DateTime @default(now())
  
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}
```

## 🚀 Utilisation

### Créer un diagnostic

1. Naviguez vers `/diagnostic`
2. Remplissez le formulaire
3. Cliquez sur "Créer le diagnostic"

### Voir les diagnostics

1. Dashboard : Affiche les derniers diagnostics et statistiques
2. Page Diagnostic : Liste complète avec détails

## 🔧 Configuration requise

### Dépendances

```json
{
  "dependencies": {
    "@prisma/client": "^6.18.0",
    "next": "16.0.1",
    "react": "19.2.0",
    "zod": "^4.1.12",
    "clsx": "^2.1.1"
  }
}
```

### Variables d'environnement

```env
DATABASE_URL="postgresql://..."
```

## 📝 Bonnes pratiques

### Code

✅ **Code propre et typé**
- Tous les fichiers utilisent TypeScript
- Types exportés pour réutilisation
- JSDoc pour les fonctions importantes

✅ **Validation robuste**
- Validation Zod côté serveur
- Messages d'erreur clairs
- Gestion des cas limites

✅ **Modularité**
- Composants réutilisables
- Séparation des responsabilités
- Structure claire et logique

### Performance

- Server Actions pour la mutation de données
- Revalidation automatique des caches
- Composants optimisés

## 🔮 Évolutions futures

### Prévues

- [ ] Édition de diagnostics existants
- [ ] Suppression de diagnostics
- [ ] Export PDF des diagnostics
- [ ] Recherche et filtres avancés
- [ ] Graphiques et statistiques
- [ ] Upload de fichiers/photos

### FlyRadar

- [ ] Intégration API de suivi de vols
- [ ] Carte interactive
- [ ] Données en temps réel
- [ ] Analyse du trafic

## 📚 Ressources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Zod Documentation](https://zod.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contribution

Le code est structuré de manière modulaire pour faciliter les extensions futures. Chaque composant est documenté et peut être modifié indépendamment.
