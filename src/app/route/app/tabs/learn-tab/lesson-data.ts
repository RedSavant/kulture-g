export type Question =
  | { type: 'choice'; question: string; options: string[]; correctIndex: number }
  | { type: 'fill'; question: string; hint: string; options: string[]; correctIndex: number }
  | { type: 'truefalse'; question: string; isTrue: boolean };

export interface LessonData {
  id: string;
  title: string;
  questions: Question[];
}

export interface ThemeData {
  name: string;
  lessons: LessonData[];
}

export const themesData: ThemeData[] = [
  {
    name: 'Thème 1',
    lessons: [
      {
        id: '1-1',
        title: 'Leçon 1',
        questions: [
          { type: 'choice', question: 'Quel pays est connu pour ses "sushis" ?', options: ['Chine', 'Corée', 'Japon', 'Thaïlande'], correctIndex: 2 },
          { type: 'fill', question: 'La ___ est une fête traditionnelle mexicaine où l\'on honore les défunts.', hint: 'Fête mexicaine', options: ['Tomatina', 'Feria', 'Quinceañera', 'Día de Muertos'], correctIndex: 3 },
          { type: 'truefalse', question: 'Le tango est une danse originaire d\'Argentine.', isTrue: true },
          { type: 'choice', question: 'Dans quel pays trouve-t-on le Taj Mahal ?', options: ['Népal', 'Inde', 'Pakistan', 'Bangladesh'], correctIndex: 1 },
          { type: 'fill', question: 'Le ___ est un art martial originaire du Japon.', hint: 'Art martial', options: ['Taekwondo', 'Karaté', 'Kung-fu', 'Capoeira'], correctIndex: 1 },
        ],
      },
      {
        id: '1-2',
        title: 'Leçon 2',
        questions: [
          { type: 'choice', question: 'Quel instrument est associé au flamenco espagnol ?', options: ['Piano', 'Violon', 'Guitare', 'Batterie'], correctIndex: 2 },
          { type: 'fill', question: 'En Inde, la ___ est la fête des couleurs qui marque le printemps.', hint: 'Fête des couleurs', options: ['Diwali', 'Holi', 'Eid', 'Pongal'], correctIndex: 1 },
          { type: 'truefalse', question: 'Le kimono est le vêtement traditionnel de la Corée.', isTrue: false },
          { type: 'choice', question: 'Quel est le plus long fleuve du monde ?', options: ['Amazone', 'Nil', 'Mississippi', 'Yangtsé'], correctIndex: 1 },
          { type: 'fill', question: 'Le ___ est un désert chaud situé en Afrique du Nord.', hint: 'Désert africain', options: ['Gobi', 'Sahara', 'Kalahari', 'Atacama'], correctIndex: 1 },
        ],
      },
      {
        id: '1-3',
        title: 'Leçon 3',
        questions: [
          { type: 'choice', question: 'Quel monument parisien a été construit pour l\'Exposition universelle de 1889 ?', options: ['Notre-Dame', 'Arc de Triomphe', 'Tour Eiffel', 'Sacré-Cœur'], correctIndex: 2 },
          { type: 'truefalse', question: 'La Grande Muraille de Chine est visible depuis l\'espace à l\'œil nu.', isTrue: false },
          { type: 'fill', question: 'Le ___ est le fleuve qui traverse Londres.', hint: 'Fleuve londonien', options: ['Seine', 'Tamise', 'Danube', 'Rhin'], correctIndex: 1 },
          { type: 'choice', question: 'Quel peintre a créé "La Nuit étoilée" ?', options: ['Monet', 'Van Gogh', 'Picasso', 'Rembrandt'], correctIndex: 1 },
          { type: 'fill', question: 'La ___ est la capitale du Japon.', hint: 'Capitale japonaise', options: ['Osaka', 'Kyoto', 'Tokyo', 'Yokohama'], correctIndex: 2 },
        ],
      },
      {
        id: '1-4',
        title: 'Leçon 4',
        questions: [
          { type: 'choice', question: 'Quel pays a la plus grande population ?', options: ['États-Unis', 'Chine', 'Inde', 'Indonésie'], correctIndex: 2 },
          { type: 'truefalse', question: 'Le mont Everest se trouve dans la chaîne de l\'Himalaya.', isTrue: true },
          { type: 'fill', question: 'La ___ est la langue la plus parlée au monde par nombre de locuteurs natifs.', hint: 'Langue la plus parlée', options: ['Anglais', 'Mandarin', 'Espagnol', 'Hindi'], correctIndex: 1 },
          { type: 'choice', question: 'Quel océan est le plus grand ?', options: ['Atlantique', 'Indien', 'Arctique', 'Pacifique'], correctIndex: 3 },
          { type: 'truefalse', question: 'L\'Australie est plus petite que le Groenland.', isTrue: false },
        ],
      },
      {
        id: '1-5',
        title: 'Leçon 5',
        questions: [
          { type: 'choice', question: 'Qui a écrit "Les Misérables" ?', options: ['Balzac', 'Zola', 'Hugo', 'Flaubert'], correctIndex: 2 },
          { type: 'fill', question: 'La ___ est une danse traditionnelle brésilienne pratiquée pendant le carnaval.', hint: 'Danse brésilienne', options: ['Tango', 'Salsa', 'Samba', 'Bachata'], correctIndex: 2 },
          { type: 'truefalse', question: 'Le thé est originaire de l\'Inde.', isTrue: false },
          { type: 'choice', question: 'Quel philosophe grec a été le professeur d\'Alexandre le Grand ?', options: ['Socrate', 'Platon', 'Aristote', 'Pythagore'], correctIndex: 2 },
          { type: 'fill', question: 'La ___ est la fête nationale française célébrée le 14 juillet.', hint: 'Fête nationale française', options: ['Armistice', 'Révolution', 'Commune', 'République'], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    name: 'Thème 2',
    lessons: [
      {
        id: '2-1',
        title: 'Leçon 1',
        questions: [
          { type: 'choice', question: 'Quel instrument de musique est symbole du jazz ?', options: ['Violon', 'Trompette', 'Piano', 'Flûte'], correctIndex: 1 },
          { type: 'truefalse', question: 'Le hip-hop est né dans le Bronx à New York.', isTrue: true },
          { type: 'fill', question: 'La ___ est une peinture murale réalisée sur un mur enduit de plâtre frais.', hint: 'Technique de peinture', options: ['Fresque', 'Aquarelle', 'Gouache', 'Pastel'], correctIndex: 0 },
          { type: 'choice', question: 'Quel artiste a peint la chapelle Sixtine ?', options: ['Léonard de Vinci', 'Raphaël', 'Michel-Ange', 'Donatello'], correctIndex: 2 },
          { type: 'truefalse', question: 'Le reggae est originaire de la Jamaïque.', isTrue: true },
        ],
      },
      {
        id: '2-2',
        title: 'Leçon 2',
        questions: [
          { type: 'choice', question: 'Quel style de danse est originaire d\'Argentine ?', options: ['Salsa', 'Tango', 'Flamenco', 'Rumba'], correctIndex: 1 },
          { type: 'fill', question: 'Le ___ est un instrument à cordes qui se joue avec un archet.', hint: 'Instrument à cordes', options: ['Violoncelle', 'Guitare', 'Harpe', 'Clavecin'], correctIndex: 0 },
          { type: 'truefalse', question: 'Le cinéma a été inventé par les frères Lumière.', isTrue: true },
          { type: 'choice', question: 'Quel mouvement artistique a donné "Les Demoiselles d\'Avignon" ?', options: ['Impressionnisme', 'Cubisme', 'Surréalisme', 'Dadaïsme'], correctIndex: 1 },
          { type: 'fill', question: 'Le ___ est un genre théâtral japonais utilisant des marionnettes.', hint: 'Théâtre japonais', options: ['Kabuki', 'Nô', 'Bunraku', 'Butō'], correctIndex: 2 },
        ],
      },
      {
        id: '2-3',
        title: 'Leçon 3',
        questions: [
          { type: 'choice', question: 'Quel compositeur a écrit "La Flûte enchantée" ?', options: ['Beethoven', 'Mozart', 'Bach', 'Chopin'], correctIndex: 1 },
          { type: 'truefalse', question: 'Le street art est considéré comme un mouvement artistique légitime.', isTrue: true },
          { type: 'fill', question: 'La ___ est une sculpture sur bois pratiquée en Afrique de l\'Ouest.', hint: 'Art africain', options: ['Vannerie', 'Poterie', 'Tissage', 'Sculpture'], correctIndex: 0 },
          { type: 'choice', question: 'Quel film a remporté l\'Oscar du meilleur film en 2020 ?', options: ['Parasite', 'Joker', '1917', 'Once Upon a Time in Hollywood'], correctIndex: 0 },
          { type: 'truefalse', question: 'Le ballet est originaire de France.', isTrue: false },
        ],
      },
      {
        id: '2-4',
        title: 'Leçon 4',
        questions: [
          { type: 'choice', question: 'Quel instrument est traditionnellement associé au rock ?', options: ['Guitare électrique', 'Batterie', 'Basse', 'Synthétiseur'], correctIndex: 0 },
          { type: 'fill', question: 'Le ___ est un style architectural caractérisé par des arcs-boutants.', hint: 'Architecture médiévale', options: ['Roman', 'Gothique', 'Renaissance', 'Baroque'], correctIndex: 1 },
          { type: 'truefalse', question: 'Le pop art a émergé dans les années 1950.', isTrue: true },
          { type: 'choice', question: 'Quel écrivain a créé le personnage de Sherlock Holmes ?', options: ['Agatha Christie', 'Conan Doyle', 'Jules Verne', 'H.G. Wells'], correctIndex: 1 },
          { type: 'fill', question: 'La ___ est une technique de peinture utilisant des points de couleur.', hint: 'Technique picturale', options: ['Pointillisme', 'Fauvisme', 'Clair-obscur', 'Sfumato'], correctIndex: 0 },
        ],
      },
      {
        id: '2-5',
        title: 'Leçon 5',
        questions: [
          { type: 'choice', question: 'Quel danseur est connu pour avoir révolutionné la danse moderne ?', options: ['Nureyev', 'Martha Graham', 'Baryshnikov', 'Pina Bausch'], correctIndex: 1 },
          { type: 'truefalse', question: 'L\'opéra est une forme d\'art combinant chant et musique.', isTrue: true },
          { type: 'fill', question: 'Le ___ est un film d\'animation japonais réalisé par Hayao Miyazaki.', hint: 'Film d\'animation', options: ['Akira', 'Ghost in the Shell', 'Totoro', 'Your Name'], correctIndex: 2 },
          { type: 'choice', question: 'Quel musée parisien abrite la Joconde ?', options: ['Orsay', 'Louvre', 'Pompidou', 'Rodin'], correctIndex: 1 },
          { type: 'truefalse', question: 'Le blues est à l\'origine du jazz et du rock.', isTrue: true },
        ],
      },
    ],
  },
  {
    name: 'Thème 3',
    lessons: [
      {
        id: '3-1',
        title: 'Leçon 1',
        questions: [
          { type: 'choice', question: 'En quelle année a commencé la Révolution française ?', options: ['1776', '1789', '1799', '1804'], correctIndex: 1 },
          { type: 'truefalse', question: 'Christophe Colomb a découvert l\'Amérique en 1492.', isTrue: true },
          { type: 'fill', question: 'Le ___ est le traité qui a mis fin à la Première Guerre mondiale.', hint: 'Traité de paix', options: ['Versailles', 'Vienne', 'Berlin', 'Rome'], correctIndex: 0 },
          { type: 'choice', question: 'Quel était le métier de Napoléon Bonaparte ?', options: ['Roi', 'Empereur', 'Président', 'Général'], correctIndex: 1 },
          { type: 'truefalse', question: 'L\'Empire romain a été fondé en 27 avant J.-C.', isTrue: true },
        ],
      },
      {
        id: '3-2',
        title: 'Leçon 2',
        questions: [
          { type: 'choice', question: 'Quel continent est le plus peuplé ?', options: ['Afrique', 'Europe', 'Amérique', 'Asie'], correctIndex: 3 },
          { type: 'fill', question: 'La ___ est la plus haute montagne d\'Afrique.', hint: 'Montagne africaine', options: ['Kilimandjaro', 'Atlas', 'Kenya', 'Rwenzori'], correctIndex: 0 },
          { type: 'truefalse', question: 'Le détroit de Béring sépare l\'Asie de l\'Amérique.', isTrue: true },
          { type: 'choice', question: 'Quel pays a la forme d\'une botte ?', options: ['France', 'Espagne', 'Italie', 'Grèce'], correctIndex: 2 },
          { type: 'fill', question: 'Le ___ est le plus grand lac d\'Afrique.', hint: 'Lac africain', options: ['Tanganyika', 'Victoria', 'Malawi', 'Turkana'], correctIndex: 1 },
        ],
      },
      {
        id: '3-3',
        title: 'Leçon 3',
        questions: [
          { type: 'choice', question: 'Qui a été le premier président des États-Unis ?', options: ['Lincoln', 'Washington', 'Jefferson', 'Franklin'], correctIndex: 1 },
          { type: 'truefalse', question: 'La guerre de Cent Ans a duré exactement 100 ans.', isTrue: false },
          { type: 'fill', question: 'Le ___ est le royaume où régnait Louis XIV.', hint: 'Royaume français', options: ['Empire', 'République', 'Royaume de France', 'Duché'], correctIndex: 2 },
          { type: 'choice', question: 'Quel empire était dirigé par Gengis Khan ?', options: ['Ottoman', 'Mongol', 'Persan', 'Maya'], correctIndex: 1 },
          { type: 'truefalse', question: 'La civilisation maya a existé au Mexique et en Amérique centrale.', isTrue: true },
        ],
      },
      {
        id: '3-4',
        title: 'Leçon 4',
        questions: [
          { type: 'choice', question: 'Quel pays d\'Afrique a été le premier à obtenir son indépendance ?', options: ['Ghana', 'Algérie', 'Sénégal', 'Kenya'], correctIndex: 0 },
          { type: 'fill', question: 'Le mur de ___ est tombé en 1989, symbolisant la fin de la guerre froide.', hint: 'Mur célèbre', options: ['Hadrien', 'Berlin', 'Chine', 'Atlantique'], correctIndex: 1 },
          { type: 'truefalse', question: 'L\'Australie a été colonisée par les Britanniques.', isTrue: true },
          { type: 'choice', question: 'Quel explorateur a découvert le Brésil ?', options: ['Colomb', 'Magellan', 'Cabral', 'Vespucci'], correctIndex: 2 },
          { type: 'fill', question: 'La ___ est la plus ancienne civilisation connue de Mésopotamie.', hint: 'Civilisation antique', options: ['Égyptienne', 'Sumer', 'Grecque', 'Perse'], correctIndex: 1 },
        ],
      },
      {
        id: '3-5',
        title: 'Leçon 5',
        questions: [
          { type: 'choice', question: 'Quel pays a construit le canal de Panama ?', options: ['France', 'États-Unis', 'Espagne', 'Grande-Bretagne'], correctIndex: 1 },
          { type: 'truefalse', question: 'L\'Empire ottoman a existé jusqu\'au XXe siècle.', isTrue: true },
          { type: 'fill', question: 'La ___ était la déesse égyptienne de la maternité.', hint: 'Déesse égyptienne', options: ['Isis', 'Hathor', 'Nout', 'Sekhmet'], correctIndex: 0 },
          { type: 'choice', question: 'Quel peuple ancien a construit le Machu Picchu ?', options: ['Aztèques', 'Mayas', 'Incas', 'Olèques'], correctIndex: 2 },
          { type: 'truefalse', question: 'La Route de la Soie reliait la Chine à l\'Europe.', isTrue: true },
        ],
      },
    ],
  },
  {
    name: 'Thème 4',
    lessons: [
      {
        id: '4-1',
        title: 'Leçon 1',
        questions: [
          { type: 'choice', question: 'Quel est l\'organe le plus grand du corps humain ?', options: ['Cœur', 'Foie', 'Peau', 'Poumon'], correctIndex: 2 },
          { type: 'truefalse', question: 'L\'eau bout à 100°C au niveau de la mer.', isTrue: true },
          { type: 'fill', question: 'L\'___ est la planète la plus proche du Soleil.', hint: 'Planète du système solaire', options: ['Vénus', 'Mercure', 'Mars', 'Terre'], correctIndex: 1 },
          { type: 'choice', question: 'Quelle force maintient les planètes en orbite ?', options: ['Magnétique', 'Gravité', 'Centrifuge', 'Électrique'], correctIndex: 1 },
          { type: 'truefalse', question: 'Les atomes sont plus petits que les électrons.', isTrue: false },
        ],
      },
      {
        id: '4-2',
        title: 'Leçon 2',
        questions: [
          { type: 'choice', question: 'Quel inventeur a créé l\'ampoule électrique ?', options: ['Tesla', 'Edison', 'Bell', 'Einstein'], correctIndex: 1 },
          { type: 'fill', question: 'La ___ est la science qui étudie les fossiles.', hint: 'Science des fossiles', options: ['Géologie', 'Paléontologie', 'Archéologie', 'Biologie'], correctIndex: 1 },
          { type: 'truefalse', question: 'Internet a été inventé dans les années 1960.', isTrue: true },
          { type: 'choice', question: 'Quel élément chimique a pour symbole O ?', options: ['Or', 'Oxygène', 'Osmium', 'Oganesson'], correctIndex: 1 },
          { type: 'fill', question: 'La ___ est la partie de l\'œil qui perçoit la lumière.', hint: 'Partie de l\'œil', options: ['Cornée', 'Cristallin', 'Rétine', 'Iris'], correctIndex: 2 },
        ],
      },
      {
        id: '4-3',
        title: 'Leçon 3',
        questions: [
          { type: 'choice', question: 'Combien d\'os comporte le corps humain adulte ?', options: ['106', '206', '306', '406'], correctIndex: 1 },
          { type: 'truefalse', question: 'La photosynthèse produit de l\'oxygène.', isTrue: true },
          { type: 'fill', question: 'Le ___ est la particule chargée positivement dans l\'atome.', hint: 'Particule atomique', options: ['Électron', 'Neutron', 'Proton', 'Quark'], correctIndex: 2 },
          { type: 'choice', question: 'Quel est le point le plus profond des océans ?', options: ['Fosse des Mariannes', 'Fosse de Java', 'Fosse des Tonga', 'Fosse du Pérou'], correctIndex: 0 },
          { type: 'truefalse', question: 'Les virus sont des êtres vivants.', isTrue: false },
        ],
      },
      {
        id: '4-4',
        title: 'Leçon 4',
        questions: [
          { type: 'choice', question: 'Quel gaz les plantes absorbent-elles pour la photosynthèse ?', options: ['Oxygène', 'Azote', 'Gaz carbonique', 'Hydrogène'], correctIndex: 2 },
          { type: 'fill', question: 'L\'___ est la science du calcul et des nombres.', hint: 'Science mathématique', options: ['Algèbre', 'Géométrie', 'Arithmétique', 'Statistique'], correctIndex: 2 },
          { type: 'truefalse', question: 'Le système solaire compte 8 planètes.', isTrue: true },
          { type: 'choice', question: 'Quel scientifique a proposé la théorie de la relativité ?', options: ['Newton', 'Einstein', 'Galilée', 'Hawking'], correctIndex: 1 },
          { type: 'fill', question: 'La ___ est la couche de l\'atmosphère qui protège des rayons UV.', hint: 'Couche atmosphérique', options: ['Troposphère', 'Stratosphère', 'Ozone', 'Ionosphère'], correctIndex: 2 },
        ],
      },
      {
        id: '4-5',
        title: 'Leçon 5',
        questions: [
          { type: 'choice', question: 'Quel animal est le plus rapide sur terre ?', options: ['Lion', 'Guépard', 'Gazelle', 'Panthère'], correctIndex: 1 },
          { type: 'truefalse', question: 'L\'ADN a une structure en double hélice.', isTrue: true },
          { type: 'fill', question: 'Le ___ est la planète la plus grande du système solaire.', hint: 'Plus grande planète', options: ['Saturne', 'Jupiter', 'Neptune', 'Uranus'], correctIndex: 1 },
          { type: 'choice', question: 'Quelle invention a révolutionné la communication au XIXe siècle ?', options: ['Téléphone', 'Radio', 'Télégraphe', 'Télévision'], correctIndex: 2 },
          { type: 'fill', question: 'La ___ est la science qui étudie les écosystèmes et les relations entre les êtres vivants et leur environnement.', hint: 'Science de l\'environnement', options: ['Biologie', 'Écologie', 'Zoologie', 'Botanique'], correctIndex: 1 },
        ],
      },
    ],
  },
];
