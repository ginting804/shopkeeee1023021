  <br />

<p align="center">
    <img src="./images/kara.png" alt="Logo">
</p>
<br />
  <p align="center">
<a href="https://sopow.fr/"><img src="https://img.shields.io/badge/Copyright-Sopow-%235865F2%20" alt="copyright"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-green" alt="license"></a>
  </p>

## Compteur avec économie

Ce repository est un projet open source développé par moi-même, il permet de transformer un salon Discord en un compteur avec économie (système de point dont la monnaie est le Kara). 

## Configuration

Tout d'abord, il vous faudra installer <a href="https://nodejs.org/en/download/">Node.JS</a>.

Quand vous aurez installé le repository, allez dans le dossier et executez les commandes suivantes :
```console
npm install
```

Allez dans le dossier images, prenez l'image "kara.png" et créez un emoji avec sur Discord.

Ensuite, allez dans le dossier src, créez un fichier "config.json" avec les informations suivantes :
```JSON
{
    "token": "token du bot",
    "prefix": "prefix du bot",
    "mongo": "url de la base de données mongodb",
    "id": "id de l'owner du bot",
    "emoji": "id de l'emoji Discord"
}
```

Pour définir le salon de comptage, faites la commande :

**prefix + "set-channel"**

<br>

Pour définir des items dans le magasin, faites la commande :

**prefix + "set-item"**

Ensuite, pour avoir plus d'indications détaillés, faites la commande :

**prefix + "help"**

<br>

Pour lancer le bot, faites une des trois commandes suivantes dans le terminal :
```console
node .
npm start 
node src/index
```

## Bug, correctifs et suggestions

Je suis ouvert a toutes demandes de corrections du code, ainsi que des suggestions.

Je suis conscient que le code peux être optimisé un maximum ou même être adapté a la v13 de Discord.JS avec slash commands.

N'hésitez pas a me contacter ou ouvrir une issue si vous avez des questions / quelque chose à redire.

## Crédits 

Ce projet est a la base un projet appartenant a reconlx.
Je me suis inspiré de son compteur SANS système d'économie pour en rajouter un.