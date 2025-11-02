# 🚀 Prochaines Étapes - Refactoring DACE

## ✅ Ce qui est FAIT

### 1. Schéma de Base de Données ✅
- ✅ Modèle Prisma refactorisé avec types numériques
- ✅ Migration appliquée avec succès
- ✅ 40+ champs bien structurés selon DACE

### 2. Validation ✅
- ✅ Schéma Zod complet avec 275 lignes
- ✅ Validation pour champs numériques (Int, Float)
- ✅ Validation pour codes IATA/ICAO
- ✅ Messages d'erreur personnalisés

### 3. Server Action ✅
- ✅ Gestion des FormData avec types numériques
- ✅ Conversion automatique des valeurs
- ✅ Création de diagnostics fonctionnelle

---

## 🔧 Ce qu'il reste à FAIRE

### 1. URGENT : Finaliser le Formulaire 🚨

**Fichier** : `components/diagnostic-form-new.tsx` (déjà créé, à compléter)

#### Sections manquantes :

##### A. Composantes Fonctionnelles (Qualitatives)
```tsx
{/* Flux et cheminements */}
<TextareaField name="cheminementPassagers" label="Cheminement passagers" />
<TextareaField name="routageAvions" label="Routage avions" />

{/* Sécurité et normes */}
<TextareaField name="normesOACIIATA" label="Normes OACI/IATA" />
<TextareaField name="niveauxSecurite" label="Niveaux de sécurité" />
<TextareaField name="exigencesConfort" label="Exigences de confort" />

{/* Points de friction */}
<TextareaField name="pointsFriction" label="Points de friction identifiés" />

{/* Équipements */}
<TextareaField name="equipementsSecurite" label="Équipements de sécurité" />
<TextareaField name="servicesTechniques" label="Services techniques" />
```

##### B. Évaluation et Optimisation
```tsx
{/* 3 niveaux d'optimisation */}
<TextareaField 
  name="optimisationLegere" 
  label="Optimisation légère"
  hint="Procédures, organisation, signalisation"
/>

<TextareaField 
  name="optimisationMoyenne" 
  label="Optimisation moyenne"
  hint="Modules temporaires, équipements"
/>

<TextareaField 
  name="optimisationLourde" 
  label="Optimisation lourde"
  hint="Agrandissement, nouvelle infrastructure"
/>

{/* Estimations */}
<TextareaField name="estimationImpacts" label="Estimation des impacts" />
<NumberInput name="estimationCouts" label="Coûts estimés (M€)" />
```

##### C. Observations et Métadonnées
```tsx
<TextareaField name="notesObservation" label="Notes d'observation" rows={5} />
<TextareaField name="contraintesStructurelles" label="Contraintes structurelles" />
<TextareaField name="donneesLocales" label="Données locales (plans, observations)" />
```

##### D. Boutons d'Action
```tsx
<div className="flex justify-end gap-3 pt-4 border-t">
  <button type="button" onClick={handleReset}>Réinitialiser</button>
  <button type="submit" disabled={isPending}>
    {isPending ? "Enregistrement..." : "Créer le diagnostic"}
  </button>
</div>
```

---

### 2. Mettre à Jour les Pages d'Affichage

#### A. Page Diagnostic (`app/diagnostic/page.tsx`)

**À modifier** : Remplacer l'ancien formulaire par le nouveau

```tsx
// Avant
import { DiagnosticForm } from "@/components/diagnostic-form";

// Après
import { DiagnosticFormNew } from "@/components/diagnostic-form-new";

// Dans le JSX
<DiagnosticFormNew />
```

**À ajouter** : Affichage des nouvelles données numériques

```tsx
{diagnostic.nombrePistes && (
  <div className="flex items-center gap-2">
    <span className="text-xs text-zinc-500">Pistes:</span>
    <span className="font-medium">{diagnostic.nombrePistes}</span>
  </div>
)}

{diagnostic.tauxSaturation && (
  <div className="flex items-center gap-2">
    <span className="text-xs text-zinc-500">Saturation:</span>
    <span className="font-medium">{diagnostic.tauxSaturation}%</span>
    <TauxBadge value={diagnostic.tauxSaturation} />
  </div>
)}
```

#### B. Page Dashboard (`app/dashboard/page.tsx`)

**À ajouter** : Statistiques avancées avec KPI

```tsx
// Calcul moyennes
const moyenneTauxSaturation = diagnostics
  .filter(d => d.tauxSaturation)
  .reduce((acc, d) => acc + d.tauxSaturation!, 0) / diagnostics.length;

// Affichage
<StatCard
  title="Taux moyen de saturation"
  value={`${moyenneTauxSaturation.toFixed(1)}%`}
  icon={<ChartIcon />}
/>
```

---

### 3. Composants Utilitaires à Créer

#### A. Badge pour Taux
```tsx
// components/taux-badge.tsx
export function TauxBadge({ value }: { value: number }) {
  const color = value > 90 ? 'red' : value > 75 ? 'orange' : 'green';
  return <span className={`badge-${color}`}>{value}%</span>;
}
```

#### B. Graphiques KPI
```tsx
// components/kpi-chart.tsx
export function KPIChart({ diagnostics }: { diagnostics: any[] }) {
  // Utiliser une lib comme recharts ou chart.js
  return <BarChart data={...} />;
}
```

---

### 4. Tests

#### A. Test de Validation
```typescript
// tests/diagnostic-validation.test.ts
describe('Diagnostic Validation', () => {
  it('valide un nombre de pistes correct', () => {
    const result = diagnosticSchema.safeParse({ nombrePistes: 2 });
    expect(result.success).toBe(true);
  });

  it('rejette un nombre de pistes invalide', () => {
    const result = diagnosticSchema.safeParse({ nombrePistes: -1 });
    expect(result.success).toBe(false);
  });
});
```

#### B. Test de Soumission
```typescript
// tests/diagnostic-creation.test.ts
describe('Diagnostic Creation', () => {
  it('crée un diagnostic avec données numériques', async () => {
    const result = await createDiagnostic({
      nomAeroport: 'Test',
      localisation: 'Test',
      nombrePistes: 2,
      // ...
    });
    expect(result.success).toBe(true);
  });
});
```

---

## 📋 Plan d'Action Recommandé

### Semaine 1 : Formulaire ⚠️ PRIORITÉ

1. **Jour 1-2** : Compléter `diagnostic-form-new.tsx`
   - Ajouter toutes les sections manquantes
   - Tester localement chaque section
   - Vérifier la soumission

2. **Jour 3** : Remplacer l'ancien formulaire
   - Mettre à jour `/diagnostic` page
   - Tester création complète
   - Vérifier affichage des données

3. **Jour 4-5** : Ajustements UX
   - Améliorer le layout
   - Ajouter des hints/tooltips
   - Responsive design

### Semaine 2 : Affichage et Analyse

1. **Jour 1-2** : Mise à jour de l'affichage
   - Cartes de diagnostic enrichies
   - Badges pour KPI
   - Formatage des nombres

2. **Jour 3-4** : Dashboard analytique
   - Statistiques agrégées
   - Graphiques simples
   - Comparaisons

3. **Jour 5** : Documentation
   - Guide utilisateur
   - Exemples de saisie
   - FAQ

### Semaine 3 : Optimisations

1. Tests automatisés
2. Export PDF
3. Recherche et filtres
4. Graphiques avancés

---

## 🎯 Objectif Final

Une application complète permettant de :

1. ✅ **Saisir** des diagnostics avec données quantitatives
2. ✅ **Valider** les données avec Zod
3. ✅ **Stocker** les données avec types corrects
4. 🔄 **Afficher** les diagnostics avec formatting approprié
5. 🔄 **Analyser** les données (moyennes, tendances)
6. 🔄 **Comparer** les aéroports
7. 🔄 **Exporter** les rapports

---

## 💻 Commandes Utiles

```bash
# Vérifier le schéma Prisma
pnpm prisma validate

# Régénérer le client Prisma
pnpm prisma generate

# Voir la base de données
pnpm prisma studio

# Lancer en dev
pnpm dev

# Build
pnpm build
```

---

## 📞 Aide

Si vous rencontrez des erreurs :

1. **Erreur de migration** : Vérifiez la connexion DB
2. **Erreur de validation** : Consultez `lib/validations/diagnostic.ts`
3. **Erreur de type** : Régénérez le client Prisma

---

## 🎉 Félicitations !

Le gros du refactoring est FAIT ! Il ne reste plus qu'à :
- Finaliser le formulaire (1-2 jours)
- Mettre à jour l'affichage (1 jour)
- Tester (1 jour)

**Total estimé : 3-4 jours** pour avoir une application complètement fonctionnelle avec le nouveau modèle DACE quantitatif.

---

**Bon courage ! 🚀**
