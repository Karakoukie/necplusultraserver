# Statistiques descriptives

## Introduction

Pratique qui consiste à collecter, analyser, interpréter des données numériques pour aider à comprendre les phénomènes complexes qui se produisent dans le monde.

## Branches

Il existe deux grands types de statistiques :

**Statistique descriptive (exploratoire)** : Permet de dégager les caractéristiques essentielles du phénomène étudié et de suggérer des hypothèses pour une étude ultérieure plus poussée en résumant l'information contenue dans les données de facon synthétique et efficace par :

- **Représentations graphiques**
- **Indicateurs** de positions, de dispersion et de relation
- **Régression linéaire**

**Statistique inférentielle** : A pour but de faire des prévisions et de prendre des décisions au vu des observations par :

- **Estimation** statistiques
- **Intervalles** de confiance, **test** d'hypothèse

## Phases d'une étude statistique

1. **Recueil de données** : construction d'un échantillon
2. **Statistique exploratoire** : formulation d'hypothèses sur la nature du phénomène aléatoire
3. **Choix d'un modèle probabiliste** : test d'adéquation
4. **Estimation des paramètres inconnus du modèle** : construction d'estimateurs
5. **Prévision** : associer un degré de confiance

## Vocabulaire

- **Population** : Groupe de données équivalentes
- **Individu** : Donnée représentant un objet réel, concret ou abstrait
- **Echantillon** : Sous-groupe d'une population
- **Modalité** : Valeur d'une variable qualitative
	- **Modalité témoin** : référence de l'étude permettant de comparer les différences avec les autres individus. *Ex: Médicament utilisé dans une études pharmacologique*
- **Interval** : Ensemble des valeurs possibles d'une variables
	- **Interval borné** :
	- **Interval réel** :
- **Classe** : Sous-groupe d'une population ou d'un échantillon en fonction d'un critère donné et ordonné de manière pratique. *Ex : Classer par tranche d'age, de 0 à 4 ans puis de 5 à 9 ans etc...*

### Types de variable

**Variable qualitatives** : Peuvent prendre un ensemble de valeurs non numériques, appelées *niveaux* ou *modalités* (*Ex: Couleur des yeux ; variété de blé ; type de nuage ; langue officielle d'un pays : évaluation : groupe sanguin*). Elles peuvent être  :

- **Nominales** : modalité équivalentes
- **Ordinales** : modalités classées
- **Binaires** : 

**Variable quantitatives** : S'exprime sous forme numérique. Elles peuvent être *discrètes* ou *continues* (*Ex: résultat d'une analyse chimique ; température l'un lieu donnée ; rendement d'une parcelle agricole*). Elles peuvent être :

- **Discrète** : valeurs comprises sont choisies dans un ensemble fini.
- **Continues** : toutes les valeurs sont possible dans un intervalle réel.

**Variables temporelles** : Expriment la date et l'heure.

**Variable Centrée** : Dont la valeur est égale à 0

**Variable Réduite** : Dont l'équart type est égal à 1

## Notation
| Symbole | Signification |
|---|---|
| $P$ | Population |
| $n$ | Nombre d'individu |
| $1$ à $n$ | Numérotation des individus |
| $i$ | Individu |
| $x, y$ | Variable |
| $x^i$ | Valeur d'une variable d'un individu |
| Ω | Total de $X^i$ |
| $f$ | Fréquence |

## Paradoxe de Simpson

Arrive lorsqu'une confusion peut avoir lieu à cause d'une ambiguité ou d'un manque d'information sur une étude donnée. [En savoir plus...](https://theconversation.com/le-paradoxe-de-simpson-illustre-par-des-donnees-de-vaccination-contre-le-covid-19-170159)

## Interprétation des valeurs

- **Moyenne** : Sensible aux "outlayers". *Ex. Moyenne(1, 2, 3, 5, 9) = 4*
- **Médiane** : Insensible aux "outlayers". *Ex. : Médiane(1, 2, **3**, 5, 9) = 3*

## Paramètres de dispersion

Caractériser comment les individus se situent par rapport à un repère (moyenne ou médiane).

- **Amplitude** : Distance entre la valeur maximale et la valeur minimal. *Exemple : Amplitude(1, 2, 3, 5, 9) = 9 - 1 = 8*
$$Max(x^i) - Min (x^i)$$
- **Variance** : Somme du carré des écarts entre les valeurs et la moyenne. *Exemple : Variance(1, 2, 3, 5, 9) = (4-1)² + (4-2)² + (4 - 3)² + (4 - 5)² + (4 - 9) = 9 + 4 + 1 + 1 + 9 = 24* $$Var(x) = \sum_i^n(x^i-n)^2$$
- **Fréquence** : La fréquence est un pourcentage d'une variable d'un individu ou d'une classe $$f(i) = \frac{n^i}{n} \sum_i^nfi=1$$
- **Ecart-type** (ou $\sigma$) : $\sqrt{variance}$
- **Quartile** : $x$ tel que $\frac{1}{4}$ des individus aient une valeur de $x < quartile$
- **Fréquence cumulée** : somme de la fréquence de chaque individu
- **Erreur standard** : $\frac{1}{\sqrt{n}}\sigma$

## Fonction de répartition

Tableau de contingence

| X\Y | A | B | C | Total |
| --- |---|---|---|---|
| M | 250 | 100 | 150 | 500 |
| N | 20 | 380 | 100 | 500 |
| Total | 270 | 480 | 250 | 1000 |


## Covariance et corrélation

- **Covariance** : valeur permettant de mesurer l'écart entre deux variables tel que $x^n \equiv y^n$
$$S^{xy}=\frac{1}{n}\sum_{i=1}^n(x^i-\overline{x})$$

### Régréssion

La régression recouvre plusieurs méthodes permettant d’approcher une variable à partir d’autres qui lui sont *corrélées*.

> Discrimination sur variables quantitatives

#### Régréssion linéaire


### Classification

