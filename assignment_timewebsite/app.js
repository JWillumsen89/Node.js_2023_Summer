const express = require('express');
const app = express();

app.use(express.json());

const questions = [
    // Ancient Mesopotamia
    {
        id: 1,
        question: 'Which ancient city is one of the oldest ever?',
        choices: ['Uruk', 'Akkad', 'Nineveh', 'Babylon'],
        answer: 'Uruk',
        era: 'Ancient Mesopotamia',
    },
    {
        id: 2,
        question: 'What ancient writing did people use in Mesopotamia?',
        choices: ['Hieroglyphs', 'Cuneiform', 'Alphabet', 'Papyrus'],
        answer: 'Cuneiform',
        era: 'Ancient Mesopotamia',
    },
    {
        id: 3,
        question: 'Who was the king who made rules for Mesopotamia?',
        choices: ['Sargon of Akkad', 'Nebuchadnezzar', 'Gilgamesh', 'Hammurabi'],
        answer: 'Hammurabi',
        era: 'Ancient Mesopotamia',
    },
    {
        id: 4,
        question: 'What do we call the wet land between two rivers in Mesopotamia?',
        choices: ['Desert', 'Riverbed', 'Oasis', 'Fertile Crescent'],
        answer: 'Fertile Crescent',
        era: 'Ancient Mesopotamia',
    },
    {
        id: 5,
        question: 'What do you call the shape of Mesopotamian writing?',
        choices: ['Letters', 'Numbers', 'Circles', 'Cuneiform'],
        answer: 'Cuneiform',
        era: 'Ancient Mesopotamia',
    },
    {
        id: 6,
        question: 'Which of these is not a famous ancient Mesopotamian city?',
        choices: ['Uruk', 'Akkad', 'Atlantis', 'Babylon'],
        answer: 'Atlantis',
        era: 'Ancient Mesopotamia',
    },
    {
        id: 7,
        question: 'What did people in Mesopotamia use to write on?',
        choices: ['Papyrus', 'Stones', 'Clay Tablets', 'Bark'],
        answer: 'Clay Tablets',
        era: 'Ancient Mesopotamia',
    },
    {
        id: 8,
        question: 'What is the famous tall structure with steps that ancient Mesopotamians built?',
        choices: ['Ziggurat', 'Pyramid', 'Tower', 'House'],
        answer: 'Ziggurat',
        era: 'Ancient Mesopotamia',
    },
    {
        id: 9,
        question: 'What did people use to count and do math in Mesopotamia?',
        choices: ['Fingers', 'Stones', 'Clay Tablets', 'Abacus'],
        answer: 'Clay Tablets',
        era: 'Ancient Mesopotamia',
    },
    {
        id: 10,
        question: 'What ancient Mesopotamian king built big walls around his city?',
        choices: ['Gilgamesh', 'Hammurabi', 'Sargon of Akkad', 'Nebuchadnezzar'],
        answer: 'Nebuchadnezzar',
        era: 'Ancient Mesopotamia',
    },

    // Ancient Egypt
    {
        id: 11,
        question: 'Who was the ancient Egyptian ruler who built the Great Pyramid of Giza?',
        choices: ['Ramses II', 'Khufu', 'Tutankhamun', 'Nefertari'],
        answer: 'Khufu',
        era: 'Ancient Egypt',
    },
    {
        id: 12,
        question: 'What river was super important to ancient Egypt?',
        choices: ['Nile', 'Tigris', 'Euphrates', 'Jordan'],
        answer: 'Nile',
        era: 'Ancient Egypt',
    },
    {
        id: 13,
        question: 'What book did ancient Egyptians write to help them in the afterlife?',
        choices: ['Rigveda', 'Book of Shadows', 'Popol Vuh', 'Book of Coming Forth by Day'],
        answer: 'Book of Coming Forth by Day',
        era: 'Ancient Egypt',
    },
    {
        id: 14,
        question: 'What did ancient Egyptians use to write on?',
        choices: ['Papyrus', 'Stones', 'Clay Tablets', 'Bark'],
        answer: 'Papyrus',
        era: 'Ancient Egypt',
    },
    {
        id: 15,
        question: 'What animal is a symbol of ancient Egypt and has a long neck?',
        choices: ['Lion', 'Hippopotamus', 'Elephant', 'Giraffe'],
        answer: 'Giraffe',
        era: 'Ancient Egypt',
    },
    {
        id: 16,
        question: 'What do you call a person who studies ancient Egyptian history and artifacts?',
        choices: ['Archaeologist', 'Astronomer', 'Botanist', 'Geologist'],
        answer: 'Archaeologist',
        era: 'Ancient Egypt',
    },
    {
        id: 17,
        question: 'What did ancient Egyptians use to write on walls and make pictures?',
        choices: ['Canvas', 'Stone', 'Papyrus', 'Hieroglyphs'],
        answer: 'Hieroglyphs',
        era: 'Ancient Egypt',
    },
    {
        id: 18,
        question: 'What tall statue with a lions body and a human head is famous in ancient Egypt?',
        choices: ['Sphinx', 'Minotaur', 'Phoenix', 'Dragon'],
        answer: 'Sphinx',
        era: 'Ancient Egypt',
    },
    {
        id: 19,
        question: 'What did ancient Egyptians use to tell time during the day with the help of a shadow?',
        choices: ['Sundial', 'Hourglass', 'Watch', 'Calendar'],
        answer: 'Sundial',
        era: 'Ancient Egypt',
    },
    {
        id: 20,
        question: 'What is the name of the ancient Egyptian writing system with pictures?',
        choices: ['Hieroglyphs', 'Alphabet', 'Cuneiform', 'Numbers'],
        answer: 'Hieroglyphs',
        era: 'Ancient Egypt',
    },

    // Classical Greece
    {
        id: 21,
        question: 'What is the name of the country where ancient Greeks lived?',
        choices: ['Sparta', 'Athens', 'Olympia', 'Troy'],
        answer: 'Sparta',
        era: 'Classical Greece',
    },
    {
        id: 22,
        question: 'Who was a wise philosopher who asked many questions and drank poison?',
        choices: ['Aristotle', 'Socrates', 'Plato', 'Homer'],
        answer: 'Socrates',
        era: 'Classical Greece',
    },
    {
        id: 23,
        question: 'What famous event brought athletes from all over Greece to compete?',
        choices: ['Pizza Party', 'Olympic Games', 'War', 'Festival'],
        answer: 'Olympic Games',
        era: 'Classical Greece',
    },
    {
        id: 24,
        question: 'What do you call a person who writes plays in ancient Greece?',
        choices: ['Athlete', 'Philosopher', 'Playwright', 'Warrior'],
        answer: 'Playwright',
        era: 'Classical Greece',
    },
    {
        id: 25,
        question: 'What building in Athens is super famous and has lots of columns?',
        choices: ['Lighthouse', 'Pyramid', 'Parthenon', 'Castle'],
        answer: 'Parthenon',
        era: 'Classical Greece',
    },
    {
        id: 26,
        question: 'What kind of stories did ancient Greeks tell about their gods and heroes?',
        choices: ['Fairy Tales', 'Myths', 'Recipes', 'News'],
        answer: 'Myths',
        era: 'Classical Greece',
    },
    {
        id: 27,
        question: 'What is the name of the battle where a small group of Greeks fought off a big Persian army?',
        choices: ['Battle of Marathon', 'Battle of Troy', 'Battle of Sparta', 'Battle of Athens'],
        answer: 'Battle of Marathon',
        era: 'Classical Greece',
    },
    {
        id: 28,
        question: 'What is the name of the epic poem about a hero named Odysseus trying to get home?',
        choices: ['Iliad', 'Odyssey', 'Aeneid', 'Epic of Gilgamesh'],
        answer: 'Odyssey',
        era: 'Classical Greece',
    },
    {
        id: 29,
        question: 'What kind of performance combines acting, singing, and dancing in ancient Greece?',
        choices: ['Play', 'Concert', 'Musical', 'Tragedy'],
        answer: 'Musical',
        era: 'Classical Greece',
    },
    {
        id: 30,
        question: 'What do you call a person who is really good at sports and competition?',
        choices: ['Artist', 'Athlete', 'Singer', 'Chef'],
        answer: 'Athlete',
        era: 'Classical Greece',
    },

    // Roman Empire
    {
        id: 31,
        question: 'What is the name of the city that was the capital of the Roman Empire?',
        choices: ['Athens', 'Sparta', 'Rome', 'Troy'],
        answer: 'Rome',
        era: 'Roman Empire',
    },
    {
        id: 32,
        question: 'Who was the famous Roman general who crossed the Alps with elephants?',
        choices: ['Julius Caesar', 'Napoleon', 'Alexander the Great', 'Hannibal'],
        answer: 'Hannibal',
        era: 'Roman Empire',
    },
    {
        id: 33,
        question: 'What big structure did the Romans build to carry water?',
        choices: ['Aquarium', 'Aqueduct', 'Aircraft Carrier', 'Amusement Park'],
        answer: 'Aqueduct',
        era: 'Roman Empire',
    },
    {
        id: 34,
        question: 'What is the name of the famous Roman road that helped with trade and travel?',
        choices: ['Silk Road', 'Highway 66', 'Appian Way', 'Golden Road'],
        answer: 'Appian Way',
        era: 'Roman Empire',
    },
    {
        id: 35,
        question: 'What do you call a person who fights animals and other people for entertainment in ancient Rome?',
        choices: ['Athlete', 'Musician', 'Gladiator', 'Scientist'],
        answer: 'Gladiator',
        era: 'Roman Empire',
    },
    {
        id: 36,
        question: 'What did the Romans use to write on that was made from animal skin?',
        choices: ['Papyrus', 'Paper', 'Tablets', 'Parchment'],
        answer: 'Parchment',
        era: 'Roman Empire',
    },
    {
        id: 37,
        question: 'What is the name of the famous Roman leader who was a military genius and became a dictator?',
        choices: ['Julius Caesar', 'Augustus', 'Nero', 'Cleopatra'],
        answer: 'Julius Caesar',
        era: 'Roman Empire',
    },
    {
        id: 38,
        question: 'What famous Roman structure is known for its oval shape and held chariot races?',
        choices: ['Stadium', 'Arena', 'Colosseum', 'Theater'],
        answer: 'Colosseum',
        era: 'Roman Empire',
    },
    {
        id: 39,
        question: 'What is the name of the river in ancient Rome where Julius Caesar was famously assassinated?',
        choices: ['Tiber River', 'Nile River', 'Euphrates River', 'Amazon River'],
        answer: 'Tiber River',
        era: 'Roman Empire',
    },
    {
        id: 40,
        question: 'What ancient Roman building was used for government meetings and decisions?',
        choices: ['Marketplace', 'Bathhouse', 'Palace', 'Senate'],
        answer: 'Senate',
        era: 'Roman Empire',
    },

    // Medieval Europe
    {
        id: 41,
        question: 'What time is often called the "Dark Ages" when things were not very bright?',
        choices: ['Renaissance', 'Enlightenment', 'Dark Ages', 'Middle Ages'],
        answer: 'Dark Ages',
        era: 'Medieval Europe',
    },
    {
        id: 42,
        question: 'What kind of big home did knights live in during medieval times?',
        choices: ['Mansion', 'Castle', 'Cottage', 'Tent'],
        answer: 'Castle',
        era: 'Medieval Europe',
    },
    {
        id: 43,
        question: 'What disease in the 14th century was called the "Black Death" and spread quickly?',
        choices: ['COVID-19', 'Plague', 'Influenza', 'Cholera'],
        answer: 'Plague',
        era: 'Medieval Europe',
    },
    {
        id: 44,
        question: 'Who copied and saved old books during medieval times when not many people could read?',
        choices: ['Wizards', 'Monks', 'Knights', 'Jesters'],
        answer: 'Monks',
        era: 'Medieval Europe',
    },
    {
        id: 45,
        question: 'What rules did knights follow in medieval times, like being brave and kind?',
        choices: ["Knight's Law", 'Chivalry', 'Feudal Code', 'Medieval Rules'],
        answer: 'Chivalry',
        era: 'Medieval Europe',
    },
    {
        id: 46,
        question: 'What did people use to light up their homes in medieval times before electricity?',
        choices: ['Candles', 'Light Bulbs', 'Lanterns', 'Flashlights'],
        answer: 'Candles',
        era: 'Medieval Europe',
    },
    {
        id: 47,
        question: 'What is the name of the big church where people went to pray and worship in medieval Europe?',
        choices: ['Mansion', 'Cathedral', 'Barn', 'Cottage'],
        answer: 'Cathedral',
        era: 'Medieval Europe',
    },
    {
        id: 48,
        question: 'What was the name of the famous medieval king who led the Crusades?',
        choices: ['King Arthur', 'King Henry VIII', 'Richard the Lionheart', 'King Tut'],
        answer: 'Richard the Lionheart',
        era: 'Medieval Europe',
    },
    {
        id: 49,
        question: 'What is the name of the famous epic poem about a knight searching for a magical grail?',
        choices: ['Odyssey', 'Beowulf', 'Iliad', 'Quest for the Holy Grail'],
        answer: 'Quest for the Holy Grail',
        era: 'Medieval Europe',
    },
    {
        id: 50,
        question: 'What is the name of the famous medieval story about a brave hero who fought a dragon?',
        choices: ['Cinderella', 'Beowulf', 'Snow White', 'Little Red Riding Hood'],
        answer: 'Beowulf',
        era: 'Medieval Europe',
    },

    // Renaissance
    {
        id: 51,
        question: 'What time in history is known for a "rebirth" of art, science, and learning?',
        choices: ['Renaissance', 'Enlightenment', 'Industrial Revolution', 'Dark Ages'],
        answer: 'Renaissance',
        era: 'Renaissance',
    },
    {
        id: 52,
        question: 'What famous Italian artist painted the Mona Lisa?',
        choices: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
        answer: 'Leonardo da Vinci',
        era: 'Renaissance',
    },
    {
        id: 53,
        question: 'What famous Italian artist painted the ceiling of the Sistine Chapel?',
        choices: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
        answer: 'Michelangelo',
        era: 'Renaissance',
    },
    {
        id: 54,
        question: 'What kind of art has sculptures made from marble and stone?',
        choices: ['Pottery', 'Sculpture', 'Painting', 'Photography'],
        answer: 'Sculpture',
        era: 'Renaissance',
    },
    {
        id: 55,
        question: 'What invention in the Renaissance helped people print books faster and cheaper?',
        choices: ['Printing Press', 'Computer', 'Typewriter', 'Telephone'],
        answer: 'Printing Press',
        era: 'Renaissance',
    },
    {
        id: 56,
        question: 'What famous Italian explorer sailed to America in the 15th century?',
        choices: ['Christopher Columbus', 'Marco Polo', 'Ferdinand Magellan', 'Leif Erikson'],
        answer: 'Christopher Columbus',
        era: 'Renaissance',
    },
    {
        id: 57,
        question: 'What is the name of the famous painting with a smiling woman by Leonardo da Vinci?',
        choices: ['The Starry Night', 'The Scream', 'Mona Lisa', 'Starry Night'],
        answer: 'Mona Lisa',
        era: 'Renaissance',
    },
    {
        id: 58,
        question: 'What kind of music uses instruments like violins, flutes, and harps?',
        choices: ['Rock', 'Classical', 'Jazz', 'Rap'],
        answer: 'Classical',
        era: 'Renaissance',
    },
    {
        id: 59,
        question: 'What is the name of the famous play by William Shakespeare about two young lovers?',
        choices: ['Romeo and Juliet', 'Macbeth', 'Hamlet', 'Othello'],
        answer: 'Romeo and Juliet',
        era: 'Renaissance',
    },
    {
        id: 60,
        question: 'What is the name of the famous queen who ruled England during the Renaissance?',
        choices: ['Cleopatra', 'Queen Elizabeth I', 'Joan of Arc', 'Queen Victoria'],
        answer: 'Queen Elizabeth I',
        era: 'Renaissance',
    },

    // Enlightenment
    {
        id: 61,
        question: 'What time in history is known for valuing reason, science, and individual rights?',
        choices: ['Renaissance', 'Enlightenment', 'Industrial Revolution', 'Dark Ages'],
        answer: 'Enlightenment',
        era: 'Enlightenment',
    },
    {
        id: 62,
        question: "What document declared America's freedom from Britain, inspired by Enlightenment ideas?",
        choices: ['Bill of Rights', 'Declaration of Independence', 'Magna Carta', 'Constitution'],
        answer: 'Declaration of Independence',
        era: 'Enlightenment',
    },
    {
        id: 63,
        question: 'Who is known for saying, "I do not agree with what you have to say, but I\'ll defend to the death your right to say it"?',
        choices: ['John Locke', 'Jean-Jacques Rousseau', 'Voltaire', 'Immanuel Kant'],
        answer: 'Voltaire',
        era: 'Enlightenment',
    },
    {
        id: 64,
        question: 'Who was the French queen known for her extravagant lifestyle during the Enlightenment?',
        choices: ['Marie Antoinette', 'Queen Victoria', 'Catherine the Great', 'Eleanor of Aquitaine'],
        answer: 'Marie Antoinette',
        era: 'Enlightenment',
    },
    {
        id: 65,
        question: 'What is the name of the idea where government power is divided to prevent tyranny?',
        choices: ['Checks and Balances', 'Separation of Powers', 'Division of Authority', 'Branch System'],
        answer: 'Separation of Powers',
        era: 'Enlightenment',
    },
    {
        id: 66,
        question: 'Who is famous for laws of motion and gravity in the Enlightenment era?',
        choices: ['Galileo Galilei', 'Johannes Kepler', 'Isaac Newton', 'Albert Einstein'],
        answer: 'Isaac Newton',
        era: 'Enlightenment',
    },
    {
        id: 67,
        question: 'What is the term for an intellectual movement that valued reason and individual rights?',
        choices: ['Renaissance', 'Enlightenment', 'Romanticism', 'Industrial Revolution'],
        answer: 'Enlightenment',
        era: 'Enlightenment',
    },
    {
        id: 68,
        question: 'What is the Enlightenment era known for valuing?',
        choices: ['Toys', 'Reason', 'Candy', 'Sleep'],
        answer: 'Reason',
        era: 'Enlightenment',
    },

    {
        id: 69,
        question: 'Which document declared that America wanted to be free from Britain during the Enlightenment?',
        choices: ['Declaration of Independence', 'Shopping List', 'Birthday Card', 'Recipe Book'],
        answer: 'Declaration of Independence',
        era: 'Enlightenment',
    },

    {
        id: 70,
        question: 'Who said, "I will protect your right to say what you think" during the Enlightenment?',
        choices: ['Superman', 'Voltaire', 'SpongeBob SquarePants', 'Elsa'],
        answer: 'Voltaire',
        era: 'Enlightenment',
    },

    // Industrial Revolution
    {
        id: 71,
        question: 'What time in history saw a shift from handmade to machine-made products?',
        choices: ['Renaissance', 'Enlightenment', 'Industrial Revolution', 'Dark Ages'],
        answer: 'Industrial Revolution',
        era: 'Industrial Revolution',
    },
    {
        id: 72,
        question: 'What invention made it easier to weave cloth during the Industrial Revolution?',
        choices: ['Spinning Wheel', 'Sewing Machine', 'Cotton Gin', 'Power Loom'],
        answer: 'Power Loom',
        era: 'Industrial Revolution',
    },
    {
        id: 73,
        question: 'What kind of power did factories use during the Industrial Revolution?',
        choices: ['Human Power', 'Steam Power', 'Wind Power', 'Horse Power'],
        answer: 'Steam Power',
        era: 'Industrial Revolution',
    },
    {
        id: 74,
        question: 'What invention helped transport goods and people on waterways during the Industrial Revolution?',
        choices: ['Steamboat', 'Airplane', 'Train', 'Automobile'],
        answer: 'Steamboat',
        era: 'Industrial Revolution',
    },
    {
        id: 75,
        question: 'What is the name of the machine that separates cotton seeds from cotton fibers?',
        choices: ['Cotton Candy Machine', 'Cotton Separator', 'Cotton Gin', 'Cotton Press'],
        answer: 'Cotton Gin',
        era: 'Industrial Revolution',
    },
    {
        id: 76,
        question: 'What is the term for people moving from the countryside to cities during the Industrial Revolution?',
        choices: ['Urbanization', 'Rural Migration', 'Suburbanization', 'Metropolitan Growth'],
        answer: 'Urbanization',
        era: 'Industrial Revolution',
    },
    {
        id: 77,
        question: 'What was the name of the first steam-powered locomotive?',
        choices: ['Fast Mover', 'Speedy Express', 'Rocket', 'Steam Master'],
        answer: 'Rocket',
        era: 'Industrial Revolution',
    },
    {
        id: 78,
        question: 'What is the term for working long hours in factories with poor conditions during the Industrial Revolution?',
        choices: ['Fun Time', 'Vacation', 'Child Labor', 'Factory Play'],
        answer: 'Child Labor',
        era: 'Industrial Revolution',
    },
    {
        id: 79,
        question: 'What is the name of the communication system that sent messages using dots and dashes?',
        choices: ['Telephone', 'Telegram', 'Cell Phone', 'Email'],
        answer: 'Telegram',
        era: 'Industrial Revolution',
    },
    {
        id: 80,
        question: 'What is the term for making things by hand instead of using machines?',
        choices: ['Handcraft', 'Handwork', 'Manual Labor', 'Artisanal'],
        answer: 'Handcraft',
        era: 'Industrial Revolution',
    },

    // World Wars Era
    {
        id: 81,
        question: 'What two Japanese cities were bombed with atomic bombs by the United States in 1945, leading to the end of World War II?',
        choices: ['Hiroshima and Nagasaki', 'Tokyo and Osaka', 'Kyoto and Fukuoka', 'Nagoya and Kobe'],
        answer: 'Hiroshima and Nagasaki',
        era: 'World Wars Era',
    },
    {
        id: 82,
        question: 'Who was the leader of the Soviet Union during much of the Cold War era?',
        choices: ['Joseph Stalin', 'Vladimir Putin', 'Mikhail Gorbachev', 'Leon Trotsky'],
        answer: 'Joseph Stalin',
        era: 'World Wars Era',
    },
    {
        id: 83,
        question:
            'What term is used to describe the period of political and military tension between the United States and the Soviet Union after World War II?',
        choices: ['The Cold War', 'The Nuclear Age', 'The Space Race', 'The Red Scare'],
        answer: 'The Cold War',
        era: 'World Wars Era',
    },
    {
        id: 84,
        question: 'What event on September 11, 2001, led to a global war on terror and increased security measures?',
        choices: ['The Great Recession', 'The Arab Spring', 'The Iraq War', 'The 9/11 terrorist attacks'],
        answer: 'The 9/11 terrorist attacks',
        era: 'World Wars Era',
    },
    {
        id: 85,
        question: 'Who was the first African American president of the United States, elected in 2008?',
        choices: ['George W. Bush', 'Barack Obama', 'Donald Trump', 'Joe Biden'],
        answer: 'Barack Obama',
        era: 'World Wars Era',
    },
    {
        id: 86,
        question: 'What social media platform, founded in 2004, has become a major part of modern communication and culture?',
        choices: ['Facebook', 'Instagram', 'Twitter', 'Snapchat'],
        answer: 'Facebook',
        era: 'World Wars Era',
    },
    {
        id: 87,
        question: 'What major global health crisis, starting in 2019, led to widespread illness and changed daily life for people around the world?',
        choices: ['Ebola outbreak', 'HIV/AIDS pandemic', 'COVID-19 pandemic', 'Zika virus outbreak'],
        answer: 'COVID-19 pandemic',
        era: 'World Wars Era',
    },
    {
        id: 88,
        question: 'What organization was created after World War II to promote peace and cooperation between countries?',
        choices: ['United Nations', 'European Union', 'NATO', 'Red Cross'],
        answer: 'United Nations',
        era: 'World Wars Era',
    },
    {
        id: 89,
        question: 'What was the code name for the Allied invasion of Normandy, France, on June 6, 1944?',
        choices: ['Operation Barbarossa', 'Operation Market Garden', 'Operation Overlord', 'Operation Desert Storm'],
        answer: 'Operation Overlord',
        era: 'World Wars Era',
    },
    {
        id: 90,
        question: 'What event during World War II led to the death of six million Jews by Nazi Germany?',
        choices: ['The Great Purge', 'The Inquisition', 'The Holocaust', 'The Crusades'],
        answer: 'The Holocaust',
        era: 'World Wars Era',
    },

    // Contemporary Era
    {
        id: 91,
        question: 'What global event, often celebrated with fireworks and gatherings, marks the start of a new year on January 1st?',
        choices: ["Valentine's Day", 'Easter', 'Independence Day', "New Year's Eve"],
        answer: "New Year's Eve",
        era: 'Contemporary Era',
    },
    {
        id: 92,
        question: 'What is the name of the popular video-sharing app where users can create and share short videos?',
        choices: ['Facebook', 'Instagram', 'YouTube', 'TikTok'],
        answer: 'TikTok',
        era: 'Contemporary Era',
    },
    {
        id: 93,
        question: 'What is the term for the practice of using technology and social media to spread false information or influence public opinion?',
        choices: ['Cyberbullying', 'Hacking', 'Misinformation', 'Cancel culture'],
        answer: 'Misinformation',
        era: 'Contemporary Era',
    },
    {
        id: 94,
        question: 'What event in 2020 led to worldwide protests against racial discrimination and police brutality?',
        choices: ['World Cup', 'Olympic Games', 'Black Lives Matter protests', 'Climate strikes'],
        answer: 'Black Lives Matter protests',
        era: 'Contemporary Era',
    },
    {
        id: 95,
        question: 'What space agency successfully landed a rover on Mars in 2021, searching for signs of past life?',
        choices: ['NASA', 'ESA', 'Roscosmos', 'ISRO'],
        answer: 'NASA',
        era: 'Contemporary Era',
    },
    {
        id: 96,
        question: 'What technology company, founded by Elon Musk, aims to develop reusable rockets and enable space travel for civilians?',
        choices: ['Boeing', 'Lockheed Martin', 'SpaceX', 'Blue Origin'],
        answer: 'SpaceX',
        era: 'Contemporary Era',
    },
    {
        id: 97,
        question: 'What is the term for the idea that people and countries should work together to solve global problems?',
        choices: ['Nationalism', 'Globalism', 'Isolationism', 'Imperialism'],
        answer: 'Globalism',
        era: 'Contemporary Era',
    },
    {
        id: 98,
        question:
            'What environmental issue, including concerns about rising temperatures and extreme weather, has gained significant attention in recent years?',
        choices: ['Deforestation', 'Air pollution', 'Climate change', 'Ozone depletion'],
        answer: 'Climate change',
        era: 'Contemporary Era',
    },
    {
        id: 99,
        question: 'What is the name of the global initiative to reduce plastic waste and protect the environment?',
        choices: ['Save the Whales', 'Clean Energy Revolution', 'Green New Deal', 'Plastic Pollution Reduction'],
        answer: 'Clean Energy Revolution',
        era: 'Contemporary Era',
    },
    {
        id: 100,
        question: 'What term is used to describe the growing trend of people working and learning from home, often using computers and the internet?',
        choices: ['Remote work', 'Digital divide', 'Cybersecurity', 'Virtual reality'],
        answer: 'Remote work',
        era: 'Contemporary Era',
    },
];

app.get('/', (req, res) => {
    res.send({ data: new Date() });
});

app.get('/questions', (req, res) => {
    const era = Number(req.query.era);

    const eraNames = [
        'Ancient Mesopotamia',
        'Ancient Egypt',
        'Classical Greece',
        'Roman Empire',
        'Medieval Europe',
        'Renaissance',
        'Enlightenment',
        'Industrial Revolution',
        'World Wars Era',
        'Contemporary Era',
    ];

    const filteredQuestions = questions.filter(q => q.era === eraNames[era - 1]);

    const questionsWithoutAnswers = filteredQuestions.map(q => {
        const { answer, ...rest } = q;
        return rest;
    });
    res.json(questionsWithoutAnswers);
});

app.post('/validate', (req, res) => {
    const id = req.body.id;
    const answer = req.body.answer;
    const era = req.body.era;
    const question = questions.find(q => q.id === id);

    if (question && question.answer === answer) {
        res.json({ data: { correct: true, timeEra: era } });
    } else {
        res.json({ data: { correct: false } });
    }
});

app.get('/questionsite', (req, res) => {
    res.sendFile(__dirname + '/public/questions.html');
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server is running on', PORT);
});
