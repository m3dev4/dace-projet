# 🧪 Guide de Test - Application DACE

## 🎯 Objectif

Ce guide vous aide à tester toutes les fonctionnalités de l'application de diagnostic aéroportuaire.

## 📋 Pré-requis

1. ✅ Base de données PostgreSQL configurée
2. ✅ Fichier `.env` avec `DATABASE_URL` correct
3. ✅ Dépendances installées (`pnpm install`)
4. ✅ Migrations appliquées (`pnpm prisma migrate dev`)

## 🚀 Lancer l'application

```bash
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🧪 Scénarios de Test

### Test 1 : Navigation de Base ✅

1. **Ouvrir** `http://localhost:3000`
2. **Vérifier** : Redirection automatique vers `/dashboard`
3. **Vérifier** : La sidebar est affichée à gauche
4. **Cliquer** sur "Diagnostic" dans la sidebar
5. **Vérifier** : Navigation vers `/diagnostic`
6. **Cliquer** sur "FlyRadar" dans la sidebar
7. **Vérifier** : Navigation vers `/flyradar`
8. **Cliquer** sur "Dashboard" dans la sidebar
9. **Vérifier** : Retour au dashboard

**Résultat attendu** : Navigation fluide entre toutes les pages

---

### Test 2 : Dashboard Initial (Sans Données) ✅

**Page** : `/dashboard`

**Vérifier** :
- [ ] Statistiques affichent "0" partout
- [ ] Section "Derniers diagnostics" affiche "Aucun diagnostic"
- [ ] Bouton "Créer un diagnostic" est présent
- [ ] Cards d'actions rapides sont cliquables

---

### Test 3 : Création d'un Diagnostic Complet ✅

**Page** : `/diagnostic`

#### Étape 1 : Remplir le formulaire

**Informations générales** :
- Nom de l'aéroport : `Aéroport Mohammed V`
- Localisation : `Casablanca, Maroc`
- Date : `Date du jour`

**Composantes physiques** :
- Pistes : `2 pistes principales (35L/17R et 35R/17L), longueur 3720m`
- Terminaux : `Terminal 1 (domestique) et Terminal 2 (international)`
- Postes aéronefs : `48 postes de stationnement dont 24 passerelles`
- Tour de contrôle : `Tour moderne de 45m de hauteur, équipée radar`

**Composantes fonctionnelles** :
- Flux passagers : `10 millions de passagers/an, capacité 14 millions`
- Équipements de sécurité : `Scanners corporels, détecteurs, caméras 360°`
- Services techniques : `Maintenance aéronautique, ravitaillement`

**Observations** :
- Notes : `Aéroport principal du Maroc, hub Royal Air Maroc. Extension prévue pour 2025.`

#### Étape 2 : Soumettre

1. **Cliquer** sur "Créer le diagnostic"
2. **Vérifier** : Spinner de chargement s'affiche
3. **Vérifier** : Message de succès "✅ Diagnostic créé avec succès !"
4. **Vérifier** : Formulaire se réinitialise
5. **Vérifier** : Nouveau diagnostic apparaît dans la liste ci-dessous

**Résultat attendu** : Diagnostic créé et visible immédiatement

---

### Test 4 : Validation du Formulaire ❌

**Page** : `/diagnostic`

#### Test 4.1 : Champs obligatoires vides

1. **Laisser vides** : Nom de l'aéroport, Localisation
2. **Cliquer** sur "Créer le diagnostic"
3. **Vérifier** : Validation HTML5 empêche la soumission

#### Test 4.2 : Nom trop court

1. **Saisir** : `A` (1 caractère) dans "Nom de l'aéroport"
2. **Remplir** les autres champs obligatoires
3. **Soumettre**
4. **Vérifier** : Message d'erreur "Le nom de l'aéroport doit contenir au moins 2 caractères"

#### Test 4.3 : Texte trop long

1. **Saisir** un texte de 600 caractères dans "Pistes"
2. **Soumettre**
3. **Vérifier** : Message d'erreur sur la limite de caractères

**Résultat attendu** : Toutes les validations fonctionnent

---

### Test 5 : Affichage des Diagnostics ✅

**Page** : `/diagnostic`

Après avoir créé 2-3 diagnostics :

**Vérifier** :
- [ ] Tous les diagnostics sont listés
- [ ] Chaque card affiche : nom, localisation, date
- [ ] Les champs optionnels remplis sont affichés
- [ ] Les champs vides ne sont pas affichés
- [ ] Badge "Actif" est présent
- [ ] Dates sont formatées en français

---

### Test 6 : Dashboard avec Données ✅

**Page** : `/dashboard`

Après avoir créé quelques diagnostics :

**Vérifier** :
- [ ] "Total Diagnostics" affiche le bon nombre
- [ ] "Cette semaine" compte les diagnostics récents
- [ ] "Ce mois" compte les diagnostics du mois
- [ ] Section "Derniers diagnostics" affiche les 5 derniers
- [ ] Les cards de diagnostic sont cliquables

---

### Test 7 : Bouton Réinitialiser ✅

**Page** : `/diagnostic`

1. **Remplir** plusieurs champs du formulaire
2. **Cliquer** sur "Réinitialiser"
3. **Vérifier** : Tous les champs sont vidés
4. **Vérifier** : Les erreurs sont effacées

---

### Test 8 : Responsive Design 📱

**Tester sur différentes tailles** :

#### Desktop (>1024px)
- [ ] Sidebar visible en permanence
- [ ] Formulaire en 2 colonnes
- [ ] Cartes côte à côte

#### Tablet (768px-1024px)
- [ ] Sidebar visible
- [ ] Formulaire adaptatif
- [ ] Cartes empilées

#### Mobile (<768px)
- [ ] Vérifier l'affichage (sidebar peut être caché)
- [ ] Formulaire en 1 colonne
- [ ] Cartes empilées

---

### Test 9 : Mode Sombre 🌙

1. **Activer** le mode sombre du système
2. **Vérifier** sur toutes les pages :
   - [ ] Couleurs inversées correctement
   - [ ] Texte lisible
   - [ ] Bordures visibles
   - [ ] Pas de problèmes de contraste

---

### Test 10 : Performance ⚡

**Page** : `/diagnostic` avec 10+ diagnostics

**Vérifier** :
- [ ] Chargement rapide de la page
- [ ] Pas de lag lors du scroll
- [ ] Soumission du formulaire fluide
- [ ] Revalidation rapide

---

## 🔍 Tests de Base de Données

### Vérifier avec Prisma Studio

```bash
pnpm prisma studio
```

1. **Ouvrir** [http://localhost:5555](http://localhost:5555)
2. **Cliquer** sur "Diagnostic"
3. **Vérifier** :
   - [ ] Tous les diagnostics créés sont présents
   - [ ] Les IDs sont des CUIDs
   - [ ] Les dates sont correctes
   - [ ] Les champs optionnels vides sont `null`

---

## 🐛 Tests d'Erreurs

### Test E1 : Base de données inaccessible

1. **Arrêter** PostgreSQL
2. **Essayer** de créer un diagnostic
3. **Vérifier** : Message d'erreur clair
4. **Redémarrer** PostgreSQL

### Test E2 : Données invalides

Tester via DevTools Console :
```javascript
// Dans le navigateur
await fetch('/api/...', {
  method: 'POST',
  body: JSON.stringify({ nomAeroport: '' })
})
```

---

## ✅ Checklist Complète

### Fonctionnalités
- [ ] Création de diagnostic
- [ ] Liste des diagnostics
- [ ] Statistiques dashboard
- [ ] Navigation sidebar
- [ ] Validation formulaire
- [ ] Messages d'erreur
- [ ] Messages de succès
- [ ] Réinitialisation formulaire

### UI/UX
- [ ] Design cohérent
- [ ] Mode sombre
- [ ] Responsive
- [ ] Loading states
- [ ] Hover effects
- [ ] Focus states

### Technique
- [ ] Server Actions
- [ ] Validation Zod
- [ ] Revalidation cache
- [ ] TypeScript sans erreurs
- [ ] Pas de console.log en prod

---

## 📊 Résultats Attendus

| Test | Statut | Notes |
|------|--------|-------|
| Navigation | ✅ | |
| Dashboard vide | ✅ | |
| Création diagnostic | ✅ | |
| Validation | ✅ | |
| Affichage liste | ✅ | |
| Dashboard avec données | ✅ | |
| Réinitialiser | ✅ | |
| Responsive | ✅ | |
| Mode sombre | ✅ | |
| Performance | ✅ | |

---

## 🎯 Test Complet (Scénario Réel)

### Scénario : Créer 3 diagnostics d'aéroports marocains

1. **Aéroport Mohammed V** (Casablanca)
2. **Aéroport Marrakech Menara** (Marrakech)
3. **Aéroport Fès-Saïss** (Fès)

Pour chaque aéroport :
- Remplir tous les champs
- Ajouter des observations détaillées
- Vérifier l'apparition dans la liste
- Vérifier la mise à jour des statistiques

---

## 📝 Rapport de Test

Après avoir effectué tous les tests :

```
✅ Tests réussis : __ / 10
❌ Tests échoués : __ / 10
⚠️  Avertissements : __

Commentaires :
_________________________________
_________________________________
```

---

## 🚀 Prochaines Étapes

Si tous les tests passent :
- [ ] Tests automatisés (Jest/Vitest)
- [ ] Tests E2E (Playwright)
- [ ] Tests de charge
- [ ] Audit de sécurité

---

**Bon testing ! 🎉**
