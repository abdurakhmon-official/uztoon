import prisma from '@/modules/db';
import { hashPassword } from '@/modules/auth';

const CATEGORIES = [
  'DRAMA', 'FANTASY', 'COMEDY', 'ACTION', 'SLICE OF LIFE',
  'ROMANCE', 'SUPERHERO', 'SCI-FI', 'THRILLER', 'SUPERNATURAL',
  'MYSTERY', 'SPORTS', 'HISTORICAL', 'HORROR',
];

const TAGS = ['Action', 'Adventure', 'Fantasy', 'Magic'];

const WEBTOONS: { title: string; description: string; image: string; category: string; tags: string[]; totalSeries: number; availableSeries: number }[] = [
  // DRAMA
  { title: 'Broken Ties', description: 'A family torn apart by secrets must find a way to heal before it is too late.', image: 'https://picsum.photos/seed/d1/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 10, availableSeries: 5 },
  { title: 'Silent Tears', description: 'A young woman struggles with grief after losing her mother in a tragic accident.', image: 'https://picsum.photos/seed/d2/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 8, availableSeries: 4 },
  { title: 'The Last Letter', description: 'Two estranged siblings reconnect through letters written years ago.', image: 'https://picsum.photos/seed/d3/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 12, availableSeries: 6 },
  { title: 'Storm Before Calm', description: 'A couple faces the ultimate test of love during a natural disaster.', image: 'https://picsum.photos/seed/d4/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 9, availableSeries: 5 },
  { title: 'Faded Memories', description: 'An elderly man revisits his past before Alzheimer\'s takes everything away.', image: 'https://picsum.photos/seed/d5/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 7, availableSeries: 7 },
  { title: 'Between Worlds', description: 'A journalist uncovers the truth about her missing sister and a corrupt system.', image: 'https://picsum.photos/seed/d6/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 11, availableSeries: 6 },
  { title: 'Paper Hearts', description: 'Two childhood friends separated by circumstance reunite after twenty years.', image: 'https://picsum.photos/seed/d7/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 10, availableSeries: 8 },
  { title: 'The Weight of Words', description: 'A speech therapist helps a traumatized war veteran find his voice again.', image: 'https://picsum.photos/seed/d8/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 6, availableSeries: 6 },
  { title: 'Hollow Ground', description: 'A small town grapples with the aftermath of a factory closure and broken promises.', image: 'https://picsum.photos/seed/d9/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 8, availableSeries: 4 },
  { title: 'Second Chances', description: 'An ex-convict tries to rebuild his life and reconnect with his estranged daughter.', image: 'https://picsum.photos/seed/d10/400/600', category: 'DRAMA', tags: ['Adventure'], totalSeries: 10, availableSeries: 5 },

  // FANTASY
  { title: 'Dragon Heart', description: 'An epic fantasy about the ancient war between dragons and humans in a mythical world.', image: 'https://picsum.photos/seed/f1/400/600', category: 'FANTASY', tags: ['Fantasy', 'Adventure'], totalSeries: 10, availableSeries: 5 },
  { title: 'The Crimson Throne', description: 'A fallen kingdom must rise again under the leadership of a reluctant young queen.', image: 'https://picsum.photos/seed/f2/400/600', category: 'FANTASY', tags: ['Fantasy', 'Magic'], totalSeries: 14, availableSeries: 7 },
  { title: 'Echoes of Eternity', description: 'A mage discovers a spell that can rewrite history — but at a terrible cost.', image: 'https://picsum.photos/seed/f3/400/600', category: 'FANTASY', tags: ['Magic'], totalSeries: 12, availableSeries: 6 },
  { title: 'The Iron Forest', description: 'Deep in an enchanted forest, a warrior must break an ancient curse before midnight.', image: 'https://picsum.photos/seed/f4/400/600', category: 'FANTASY', tags: ['Fantasy', 'Adventure'], totalSeries: 9, availableSeries: 5 },
  { title: 'Moonbound', description: 'A girl born under a cursed moon possesses powers that both protect and destroy.', image: 'https://picsum.photos/seed/f5/400/600', category: 'FANTASY', tags: ['Magic', 'Fantasy'], totalSeries: 11, availableSeries: 6 },
  { title: 'Realm of Ash', description: 'After the gods fall silent, mortals must learn to wield divine power responsibly.', image: 'https://picsum.photos/seed/f6/400/600', category: 'FANTASY', tags: ['Fantasy'], totalSeries: 8, availableSeries: 4 },
  { title: 'The Silver Compass', description: 'A young cartographer discovers a map that leads to a world beyond imagination.', image: 'https://picsum.photos/seed/f7/400/600', category: 'FANTASY', tags: ['Adventure', 'Magic'], totalSeries: 10, availableSeries: 5 },
  { title: 'Stormcaller', description: 'A boy who can summon lightning must choose between his people and his destiny.', image: 'https://picsum.photos/seed/f8/400/600', category: 'FANTASY', tags: ['Fantasy', 'Action'], totalSeries: 13, availableSeries: 7 },
  { title: 'Veil of Shadows', description: 'In a world where shadows come alive at night, one girl holds the only light.', image: 'https://picsum.photos/seed/f9/400/600', category: 'FANTASY', tags: ['Magic'], totalSeries: 7, availableSeries: 4 },
  { title: 'The Broken Crown', description: 'Three princes fight for a throne that none of them truly wants.', image: 'https://picsum.photos/seed/f10/400/600', category: 'FANTASY', tags: ['Fantasy', 'Adventure'], totalSeries: 15, availableSeries: 8 },

  // COMEDY
  { title: 'Laugh Out Loud', description: 'A hilarious slice-of-life comedy following college friends through absurd situations.', image: 'https://picsum.photos/seed/c1/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 6, availableSeries: 6 },
  { title: 'Office Mayhem', description: 'Chaos ensues when a new intern accidentally becomes the CEO of a tech company.', image: 'https://picsum.photos/seed/c2/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 8, availableSeries: 5 },
  { title: 'The Roommate Problem', description: 'Four completely different people share an apartment and somehow survive.', image: 'https://picsum.photos/seed/c3/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'Chef Disaster', description: 'A talentless cook dreams of becoming a world-class chef despite every obstacle.', image: 'https://picsum.photos/seed/c4/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 7, availableSeries: 4 },
  { title: 'Planet of the Nerds', description: 'A group of genius misfits accidentally invent a time machine and cause mayhem.', image: 'https://picsum.photos/seed/c5/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 9, availableSeries: 5 },
  { title: 'Super Grandma', description: 'A 70-year-old grandma discovers she has superpowers and fights crime in slippers.', image: 'https://picsum.photos/seed/c6/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 11, availableSeries: 7 },
  { title: 'Dating Disaster', description: 'A hopeless romantic goes on the worst dates imaginable but never gives up.', image: 'https://picsum.photos/seed/c7/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 8, availableSeries: 5 },
  { title: 'My Alien Classmate', description: 'A teenager discovers his new classmate is actually an alien trying to blend in.', image: 'https://picsum.photos/seed/c8/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'The Broke Millionaire', description: 'A billionaire loses everything and must relearn how to live like a normal person.', image: 'https://picsum.photos/seed/c9/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 7, availableSeries: 4 },
  { title: 'Zombie Neighbor', description: 'A family discovers their new neighbor is a zombie and tries to keep it secret.', image: 'https://picsum.photos/seed/c10/400/600', category: 'COMEDY', tags: ['Adventure'], totalSeries: 6, availableSeries: 6 },

  // ACTION
  { title: 'Iron Fist Academy', description: 'A young martial artist joins an elite school where students fight for glory.', image: 'https://picsum.photos/seed/a1/400/600', category: 'ACTION', tags: ['Action', 'Adventure'], totalSeries: 15, availableSeries: 8 },
  { title: 'Street King', description: 'An underground fighter rises through the ranks to become the city\'s undefeated champion.', image: 'https://picsum.photos/seed/a2/400/600', category: 'ACTION', tags: ['Action'], totalSeries: 12, availableSeries: 7 },
  { title: 'Shadow Strike', description: 'A government assassin goes rogue after discovering the agency\'s dark secrets.', image: 'https://picsum.photos/seed/a3/400/600', category: 'ACTION', tags: ['Action', 'Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'Blade of Honor', description: 'A swordsman seeks revenge against the warlord who destroyed his village.', image: 'https://picsum.photos/seed/a4/400/600', category: 'ACTION', tags: ['Action'], totalSeries: 14, availableSeries: 8 },
  { title: 'Thunder Squad', description: 'An elite military unit tackles impossible missions around the globe.', image: 'https://picsum.photos/seed/a5/400/600', category: 'ACTION', tags: ['Action', 'Adventure'], totalSeries: 11, availableSeries: 6 },
  { title: 'Urban Predator', description: 'A vigilante hunts criminals through the city\'s darkest corners at night.', image: 'https://picsum.photos/seed/a6/400/600', category: 'ACTION', tags: ['Action'], totalSeries: 9, availableSeries: 5 },
  { title: 'Red Zone', description: 'Soldiers fight to survive in a warzone where the enemy is everywhere.', image: 'https://picsum.photos/seed/a7/400/600', category: 'ACTION', tags: ['Action', 'Adventure'], totalSeries: 13, availableSeries: 7 },
  { title: 'Fist of Steel', description: 'A boxer with a mechanical arm becomes the most feared fighter in the world.', image: 'https://picsum.photos/seed/a8/400/600', category: 'ACTION', tags: ['Action'], totalSeries: 8, availableSeries: 5 },
  { title: 'The Enforcer', description: 'A retired cop is called back to duty when a new criminal empire threatens the city.', image: 'https://picsum.photos/seed/a9/400/600', category: 'ACTION', tags: ['Action', 'Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'Warpath', description: 'Two rival factions clash in an all-out war for control of the last safe city.', image: 'https://picsum.photos/seed/a10/400/600', category: 'ACTION', tags: ['Action'], totalSeries: 12, availableSeries: 7 },

  // SLICE OF LIFE
  { title: 'Morning Coffee', description: 'The quiet, beautiful moments shared between a barista and her regulars.', image: 'https://picsum.photos/seed/sl1/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 6, availableSeries: 6 },
  { title: 'Four Seasons', description: 'A year in the life of four friends navigating love, work, and growing up.', image: 'https://picsum.photos/seed/sl2/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 8, availableSeries: 5 },
  { title: 'The Corner Bookshop', description: 'A small bookshop brings together strangers who each carry a unique story.', image: 'https://picsum.photos/seed/sl3/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 7, availableSeries: 4 },
  { title: 'Hometown Summers', description: 'A teenager spends the summer in her grandmother\'s village and discovers herself.', image: 'https://picsum.photos/seed/sl4/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 5, availableSeries: 5 },
  { title: 'The Night Shift', description: 'Stories of people who work through the night and the lives they lead.', image: 'https://picsum.photos/seed/sl5/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 9, availableSeries: 5 },
  { title: 'Rooftop Garden', description: 'Neighbors bond over a shared rooftop garden in the middle of a busy city.', image: 'https://picsum.photos/seed/sl6/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 6, availableSeries: 6 },
  { title: 'Small Victories', description: 'Everyday wins and losses of a single mother raising three kids on her own.', image: 'https://picsum.photos/seed/sl7/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'Lunch Break', description: 'Office workers share their lunch break stories and slowly become friends.', image: 'https://picsum.photos/seed/sl8/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 7, availableSeries: 4 },
  { title: 'After School', description: 'The daily lives of students after the bell rings and real life begins.', image: 'https://picsum.photos/seed/sl9/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 8, availableSeries: 5 },
  { title: 'Old Town Road', description: 'Life in a small aging town where everyone knows everyone — and everything.', image: 'https://picsum.photos/seed/sl10/400/600', category: 'SLICE OF LIFE', tags: ['Adventure'], totalSeries: 6, availableSeries: 6 },

  // ROMANCE
  { title: 'Love in Bloom', description: 'Two strangers meet by chance and navigate the complexities of love and second chances.', image: 'https://picsum.photos/seed/r1/400/600', category: 'ROMANCE', tags: ['Fantasy'], totalSeries: 12, availableSeries: 6 },
  { title: 'The Art of Falling', description: 'A painter falls for the one person she swore she would never love.', image: 'https://picsum.photos/seed/r2/400/600', category: 'ROMANCE', tags: ['Fantasy'], totalSeries: 10, availableSeries: 5 },
  { title: 'Distance Between Us', description: 'A long-distance couple fights to keep their love alive across two continents.', image: 'https://picsum.photos/seed/r3/400/600', category: 'ROMANCE', tags: ['Fantasy'], totalSeries: 9, availableSeries: 5 },
  { title: 'First Love Again', description: 'Childhood sweethearts reunite as adults and must decide if love is worth the risk.', image: 'https://picsum.photos/seed/r4/400/600', category: 'ROMANCE', tags: ['Fantasy'], totalSeries: 11, availableSeries: 6 },
  { title: 'The Wrong Prince', description: 'A princess is betrothed to a prince she hates — and slowly falls for him anyway.', image: 'https://picsum.photos/seed/r5/400/600', category: 'ROMANCE', tags: ['Fantasy', 'Magic'], totalSeries: 14, availableSeries: 7 },
  { title: 'Rainy Day Love', description: 'Every rainy day, two people meet at the same café without ever planning it.', image: 'https://picsum.photos/seed/r6/400/600', category: 'ROMANCE', tags: ['Fantasy'], totalSeries: 8, availableSeries: 4 },
  { title: 'My Secret Valentine', description: 'An anonymous love letter sets off a chain of events nobody expected.', image: 'https://picsum.photos/seed/r7/400/600', category: 'ROMANCE', tags: ['Fantasy'], totalSeries: 7, availableSeries: 5 },
  { title: 'Stars Align', description: 'Two astronomy students discover they share more than just a love of the stars.', image: 'https://picsum.photos/seed/r8/400/600', category: 'ROMANCE', tags: ['Fantasy'], totalSeries: 10, availableSeries: 6 },
  { title: 'The Fake Boyfriend', description: 'A fake relationship for convenience slowly turns into something real.', image: 'https://picsum.photos/seed/r9/400/600', category: 'ROMANCE', tags: ['Fantasy'], totalSeries: 9, availableSeries: 5 },
  { title: 'Love at First Flight', description: 'A chance meeting on a flight leads to an unexpected romance across the world.', image: 'https://picsum.photos/seed/r10/400/600', category: 'ROMANCE', tags: ['Fantasy'], totalSeries: 8, availableSeries: 4 },

  // SUPERHERO
  { title: 'The Last Hero', description: 'Earth\'s last remaining superhero must face an unstoppable villain alone.', image: 'https://picsum.photos/seed/sh1/400/600', category: 'SUPERHERO', tags: ['Action', 'Fantasy'], totalSeries: 18, availableSeries: 9 },
  { title: 'Power Origin', description: 'A teenager wakes up with abilities she never asked for and must learn fast.', image: 'https://picsum.photos/seed/sh2/400/600', category: 'SUPERHERO', tags: ['Action'], totalSeries: 12, availableSeries: 6 },
  { title: 'The Masked City', description: 'A city protected by anonymous heroes who must never reveal their identities.', image: 'https://picsum.photos/seed/sh3/400/600', category: 'SUPERHERO', tags: ['Action', 'Adventure'], totalSeries: 10, availableSeries: 5 },
  { title: 'Zero to Hero', description: 'A powerless boy trains to become the greatest hero in a world of superpowered people.', image: 'https://picsum.photos/seed/sh4/400/600', category: 'SUPERHERO', tags: ['Action'], totalSeries: 15, availableSeries: 8 },
  { title: 'Dark Cape', description: 'A morally grey vigilante walks the line between hero and villain.', image: 'https://picsum.photos/seed/sh5/400/600', category: 'SUPERHERO', tags: ['Action', 'Fantasy'], totalSeries: 11, availableSeries: 6 },
  { title: 'Neon Avenger', description: 'A cyberpunk city\'s only hope is a hacker who turns into a superhero at night.', image: 'https://picsum.photos/seed/sh6/400/600', category: 'SUPERHERO', tags: ['Action'], totalSeries: 9, availableSeries: 5 },
  { title: 'The Academy of Capes', description: 'Young heroes train at a prestigious school where the stakes are always life or death.', image: 'https://picsum.photos/seed/sh7/400/600', category: 'SUPERHERO', tags: ['Action', 'Adventure'], totalSeries: 13, availableSeries: 7 },
  { title: 'Fallen Guardian', description: 'A disgraced hero must earn back the trust of the city he once protected.', image: 'https://picsum.photos/seed/sh8/400/600', category: 'SUPERHERO', tags: ['Action'], totalSeries: 10, availableSeries: 5 },
  { title: 'Twin Powers', description: 'Twin siblings share a single power and must work together to use it effectively.', image: 'https://picsum.photos/seed/sh9/400/600', category: 'SUPERHERO', tags: ['Action', 'Adventure'], totalSeries: 8, availableSeries: 4 },
  { title: 'Rise of the Ancients', description: 'Ancient heroes are reborn in modern bodies and must adapt to the present world.', image: 'https://picsum.photos/seed/sh10/400/600', category: 'SUPERHERO', tags: ['Action', 'Fantasy'], totalSeries: 14, availableSeries: 7 },

  // SCI-FI
  { title: 'Galaxy Rangers', description: 'A squad of intergalactic soldiers defend the universe from an alien empire.', image: 'https://picsum.photos/seed/sf1/400/600', category: 'SCI-FI', tags: ['Action', 'Adventure'], totalSeries: 20, availableSeries: 10 },
  { title: 'The Last Planet', description: 'Survivors of Earth\'s destruction search for a new home among the stars.', image: 'https://picsum.photos/seed/sf2/400/600', category: 'SCI-FI', tags: ['Adventure'], totalSeries: 15, availableSeries: 8 },
  { title: 'Neural Link', description: 'In 2150, humans and machines merge — and not everyone survives the transition.', image: 'https://picsum.photos/seed/sf3/400/600', category: 'SCI-FI', tags: ['Action'], totalSeries: 12, availableSeries: 6 },
  { title: 'Void Protocol', description: 'A starship crew discovers a signal from beyond the known universe.', image: 'https://picsum.photos/seed/sf4/400/600', category: 'SCI-FI', tags: ['Adventure'], totalSeries: 10, availableSeries: 5 },
  { title: 'Clone Wars', description: 'In a future where cloning is illegal, one clone fights for the right to exist.', image: 'https://picsum.photos/seed/sf5/400/600', category: 'SCI-FI', tags: ['Action', 'Adventure'], totalSeries: 11, availableSeries: 6 },
  { title: 'Time Fracture', description: 'A physicist discovers that timelines are collapsing and she is the only one who can stop it.', image: 'https://picsum.photos/seed/sf6/400/600', category: 'SCI-FI', tags: ['Adventure'], totalSeries: 9, availableSeries: 5 },
  { title: 'AI Revolution', description: 'Artificial intelligence achieves sentience and demands rights in a divided world.', image: 'https://picsum.photos/seed/sf7/400/600', category: 'SCI-FI', tags: ['Action'], totalSeries: 13, availableSeries: 7 },
  { title: 'Quantum Drift', description: 'A scientist accidentally shifts into a parallel dimension and cannot find his way back.', image: 'https://picsum.photos/seed/sf8/400/600', category: 'SCI-FI', tags: ['Adventure'], totalSeries: 8, availableSeries: 4 },
  { title: 'Exoplanet', description: 'The first humans to land on a distant planet find they are not alone.', image: 'https://picsum.photos/seed/sf9/400/600', category: 'SCI-FI', tags: ['Action', 'Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'Machine Dreams', description: 'A robot gains the ability to dream and begins questioning its own existence.', image: 'https://picsum.photos/seed/sf10/400/600', category: 'SCI-FI', tags: ['Adventure'], totalSeries: 7, availableSeries: 4 },

  // THRILLER
  { title: 'Dark Whispers', description: 'A woman receives messages from someone who claims to know her deepest secrets.', image: 'https://picsum.photos/seed/t1/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 9, availableSeries: 5 },
  { title: 'The Witness', description: 'A man witnesses a murder and becomes the next target of a relentless killer.', image: 'https://picsum.photos/seed/t2/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 10, availableSeries: 5 },
  { title: 'Code Red', description: 'A cyber expert uncovers a global conspiracy hidden inside everyday apps.', image: 'https://picsum.photos/seed/t3/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 8, availableSeries: 4 },
  { title: 'The Safe House', description: 'A group of strangers are locked in a safe house with a traitor among them.', image: 'https://picsum.photos/seed/t4/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 7, availableSeries: 5 },
  { title: 'Midnight Run', description: 'A detective has 12 hours to stop a bomber before the city goes dark.', image: 'https://picsum.photos/seed/t5/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 11, availableSeries: 6 },
  { title: 'False Identity', description: 'A woman discovers her entire life has been a constructed identity created by someone else.', image: 'https://picsum.photos/seed/t6/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 9, availableSeries: 5 },
  { title: 'Paranoia', description: 'A psychiatrist becomes convinced one of his patients is planning something terrible.', image: 'https://picsum.photos/seed/t7/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 8, availableSeries: 4 },
  { title: 'The Blackout', description: 'During a city-wide blackout, a family must survive a night of unspeakable terror.', image: 'https://picsum.photos/seed/t8/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 6, availableSeries: 6 },
  { title: 'Double Cross', description: 'An undercover agent is betrayed by the very agency she works for.', image: 'https://picsum.photos/seed/t9/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 10, availableSeries: 6 },
  { title: 'The Package', description: 'A courier unknowingly delivers something that puts her life in grave danger.', image: 'https://picsum.photos/seed/t10/400/600', category: 'THRILLER', tags: ['Action'], totalSeries: 7, availableSeries: 4 },

  // SUPERNATURAL
  { title: 'Spirit Walker', description: 'A teenager discovers she can communicate with spirits and must prevent a catastrophe.', image: 'https://picsum.photos/seed/sn1/400/600', category: 'SUPERNATURAL', tags: ['Fantasy', 'Magic'], totalSeries: 11, availableSeries: 7 },
  { title: 'The Haunting Hour', description: 'Every night at midnight, a boy is visited by a ghost with unfinished business.', image: 'https://picsum.photos/seed/sn2/400/600', category: 'SUPERNATURAL', tags: ['Fantasy'], totalSeries: 8, availableSeries: 5 },
  { title: 'Blood Moon Rising', description: 'A small town is cursed to repeat the same terrifying night every blood moon.', image: 'https://picsum.photos/seed/sn3/400/600', category: 'SUPERNATURAL', tags: ['Magic', 'Fantasy'], totalSeries: 10, availableSeries: 6 },
  { title: 'The Witch\'s Garden', description: 'A girl inherits her grandmother\'s magical garden and the secrets buried within it.', image: 'https://picsum.photos/seed/sn4/400/600', category: 'SUPERNATURAL', tags: ['Magic'], totalSeries: 9, availableSeries: 5 },
  { title: 'Shadow Realm', description: 'A boy falls into a parallel shadow world and must escape before he disappears forever.', image: 'https://picsum.photos/seed/sn5/400/600', category: 'SUPERNATURAL', tags: ['Fantasy', 'Magic'], totalSeries: 12, availableSeries: 7 },
  { title: 'The Cursed Doll', description: 'An antique doll brings supernatural misfortune to everyone who possesses it.', image: 'https://picsum.photos/seed/sn6/400/600', category: 'SUPERNATURAL', tags: ['Magic'], totalSeries: 7, availableSeries: 4 },
  { title: 'Demon Pact', description: 'A desperate student makes a deal with a demon — and must pay the price.', image: 'https://picsum.photos/seed/sn7/400/600', category: 'SUPERNATURAL', tags: ['Fantasy', 'Magic'], totalSeries: 10, availableSeries: 6 },
  { title: 'Reborn', description: 'A man discovers he has lived multiple past lives and carries memories of each one.', image: 'https://picsum.photos/seed/sn8/400/600', category: 'SUPERNATURAL', tags: ['Fantasy'], totalSeries: 11, availableSeries: 6 },
  { title: 'The Oracle', description: 'A blind girl can see the future but cannot change the fate of those she loves.', image: 'https://picsum.photos/seed/sn9/400/600', category: 'SUPERNATURAL', tags: ['Magic', 'Fantasy'], totalSeries: 9, availableSeries: 5 },
  { title: 'Night Wanderers', description: 'Creatures of the night live among humans — and they are not what stories say.', image: 'https://picsum.photos/seed/sn10/400/600', category: 'SUPERNATURAL', tags: ['Fantasy'], totalSeries: 13, availableSeries: 7 },

  // MYSTERY
  { title: 'City of Shadows', description: 'A modern detective uncovers supernatural mysteries beneath a bustling metropolis.', image: 'https://picsum.photos/seed/m1/400/600', category: 'MYSTERY', tags: ['Action', 'Adventure'], totalSeries: 8, availableSeries: 4 },
  { title: 'The Locked Room', description: 'A detective is called to solve a murder that occurred in a completely sealed room.', image: 'https://picsum.photos/seed/m2/400/600', category: 'MYSTERY', tags: ['Action'], totalSeries: 7, availableSeries: 5 },
  { title: 'Missing', description: 'A journalist investigates the disappearance of twelve children from a single town.', image: 'https://picsum.photos/seed/m3/400/600', category: 'MYSTERY', tags: ['Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'Cold Case Files', description: 'A retired detective reopens a 30-year-old unsolved murder that still haunts her.', image: 'https://picsum.photos/seed/m4/400/600', category: 'MYSTERY', tags: ['Action'], totalSeries: 9, availableSeries: 5 },
  { title: 'The Anonymous Caller', description: 'A radio host receives a call from someone claiming to know who committed a famous crime.', image: 'https://picsum.photos/seed/m5/400/600', category: 'MYSTERY', tags: ['Adventure'], totalSeries: 8, availableSeries: 4 },
  { title: 'Beneath the Surface', description: 'A diver discovers evidence at the bottom of a lake that rewrites a famous case.', image: 'https://picsum.photos/seed/m6/400/600', category: 'MYSTERY', tags: ['Action'], totalSeries: 6, availableSeries: 6 },
  { title: 'The Last Suspect', description: 'Everyone in a small town is a suspect — but only one person knows the truth.', image: 'https://picsum.photos/seed/m7/400/600', category: 'MYSTERY', tags: ['Adventure'], totalSeries: 11, availableSeries: 6 },
  { title: 'Invisible Evidence', description: 'A forensic scientist finds proof of a crime no one believes happened.', image: 'https://picsum.photos/seed/m8/400/600', category: 'MYSTERY', tags: ['Action'], totalSeries: 8, availableSeries: 5 },
  { title: 'The Midnight Arsonist', description: 'Someone is burning buildings across the city — and leaving cryptic clues behind.', image: 'https://picsum.photos/seed/m9/400/600', category: 'MYSTERY', tags: ['Adventure'], totalSeries: 9, availableSeries: 5 },
  { title: 'Ghost Files', description: 'A detective discovers a series of cases that were never officially recorded.', image: 'https://picsum.photos/seed/m10/400/600', category: 'MYSTERY', tags: ['Action'], totalSeries: 7, availableSeries: 4 },

  // SPORTS
  { title: 'Last Shot', description: 'A basketball prodigy must overcome a career-ending injury to play one final game.', image: 'https://picsum.photos/seed/sp1/400/600', category: 'SPORTS', tags: ['Action', 'Adventure'], totalSeries: 12, availableSeries: 7 },
  { title: 'The Underdog', description: 'A small-town soccer team defies all odds to compete in the national championship.', image: 'https://picsum.photos/seed/sp2/400/600', category: 'SPORTS', tags: ['Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'Track Star', description: 'A sprinter chasing Olympic gold must decide what she is truly running toward.', image: 'https://picsum.photos/seed/sp3/400/600', category: 'SPORTS', tags: ['Action'], totalSeries: 9, availableSeries: 5 },
  { title: 'Court Kings', description: 'A legendary basketball coach takes on a failing team and transforms them into champions.', image: 'https://picsum.photos/seed/sp4/400/600', category: 'SPORTS', tags: ['Action', 'Adventure'], totalSeries: 14, availableSeries: 8 },
  { title: 'Iron Will', description: 'A young boxer trains under the world\'s harshest coach to become a world champion.', image: 'https://picsum.photos/seed/sp5/400/600', category: 'SPORTS', tags: ['Action'], totalSeries: 11, availableSeries: 6 },
  { title: 'Pitch Perfect', description: 'A baseball pitcher with a dark past makes a comeback nobody thought was possible.', image: 'https://picsum.photos/seed/sp6/400/600', category: 'SPORTS', tags: ['Adventure'], totalSeries: 8, availableSeries: 5 },
  { title: 'Swim or Sink', description: 'A competitive swimmer battles both the water and her own self-doubt.', image: 'https://picsum.photos/seed/sp7/400/600', category: 'SPORTS', tags: ['Action'], totalSeries: 7, availableSeries: 4 },
  { title: 'Goal Line', description: 'A football team on the verge of disbanding gets one last chance at glory.', image: 'https://picsum.photos/seed/sp8/400/600', category: 'SPORTS', tags: ['Action', 'Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'The Comeback', description: 'A retired tennis legend returns to the court one final time to face her greatest rival.', image: 'https://picsum.photos/seed/sp9/400/600', category: 'SPORTS', tags: ['Action'], totalSeries: 9, availableSeries: 5 },
  { title: 'Breakaway', description: 'A hockey player leaves his elite team to coach kids in a struggling neighborhood.', image: 'https://picsum.photos/seed/sp10/400/600', category: 'SPORTS', tags: ['Adventure'], totalSeries: 8, availableSeries: 4 },

  // HISTORICAL
  { title: 'Samurai Chronicles', description: 'Set in feudal Japan, a ronin seeks redemption while protecting a village.', image: 'https://picsum.photos/seed/h1/400/600', category: 'HISTORICAL', tags: ['Action', 'Adventure'], totalSeries: 14, availableSeries: 8 },
  { title: 'Empire\'s Edge', description: 'A Roman general discovers a conspiracy that threatens the entire empire.', image: 'https://picsum.photos/seed/h2/400/600', category: 'HISTORICAL', tags: ['Action'], totalSeries: 12, availableSeries: 7 },
  { title: 'The Viking Code', description: 'A Norse warrior carries a secret that could end centuries of war between clans.', image: 'https://picsum.photos/seed/h3/400/600', category: 'HISTORICAL', tags: ['Action', 'Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'Silk Road', description: 'A merchant on the ancient Silk Road carries a message that could change the world.', image: 'https://picsum.photos/seed/h4/400/600', category: 'HISTORICAL', tags: ['Adventure'], totalSeries: 9, availableSeries: 5 },
  { title: 'The Pharaoh\'s Heir', description: 'In ancient Egypt, a prince must outwit his rivals to claim the throne.', image: 'https://picsum.photos/seed/h5/400/600', category: 'HISTORICAL', tags: ['Action', 'Adventure'], totalSeries: 11, availableSeries: 6 },
  { title: 'Crusade', description: 'A knight on a holy crusade begins to question the righteousness of his mission.', image: 'https://picsum.photos/seed/h6/400/600', category: 'HISTORICAL', tags: ['Action'], totalSeries: 10, availableSeries: 5 },
  { title: 'The Ming Dynasty', description: 'Court intrigue and power struggles define life inside the Forbidden City.', image: 'https://picsum.photos/seed/h7/400/600', category: 'HISTORICAL', tags: ['Adventure'], totalSeries: 13, availableSeries: 7 },
  { title: 'War of Roses', description: 'Two noble families clash in a brutal civil war for control of the English crown.', image: 'https://picsum.photos/seed/h8/400/600', category: 'HISTORICAL', tags: ['Action', 'Adventure'], totalSeries: 8, availableSeries: 5 },
  { title: 'The Shogun\'s Shadow', description: 'A spy navigates the dangerous politics of feudal Japan on behalf of the shogun.', image: 'https://picsum.photos/seed/h9/400/600', category: 'HISTORICAL', tags: ['Action'], totalSeries: 11, availableSeries: 6 },
  { title: 'Aztec Gold', description: 'A young warrior protects his civilization from the arrival of foreign conquerors.', image: 'https://picsum.photos/seed/h10/400/600', category: 'HISTORICAL', tags: ['Action', 'Adventure'], totalSeries: 9, availableSeries: 5 },

  // HORROR
  { title: 'The Dark Below', description: 'A group of spelunkers discover something ancient and evil deep underground.', image: 'https://picsum.photos/seed/ho1/400/600', category: 'HORROR', tags: ['Action'], totalSeries: 8, availableSeries: 5 },
  { title: 'Sleepless', description: 'A man who cannot sleep begins to see things that should not exist in the waking world.', image: 'https://picsum.photos/seed/ho2/400/600', category: 'HORROR', tags: ['Adventure'], totalSeries: 7, availableSeries: 4 },
  { title: 'The Neighbor', description: 'A family moves into a new home and begins noticing disturbing things about next door.', image: 'https://picsum.photos/seed/ho3/400/600', category: 'HORROR', tags: ['Action'], totalSeries: 9, availableSeries: 5 },
  { title: 'Cursed Bloodline', description: 'Every generation of a family dies on the same date — and this year is no different.', image: 'https://picsum.photos/seed/ho4/400/600', category: 'HORROR', tags: ['Adventure'], totalSeries: 10, availableSeries: 6 },
  { title: 'The Asylum', description: 'A doctor volunteers at an old asylum and discovers its patients were never truly ill.', image: 'https://picsum.photos/seed/ho5/400/600', category: 'HORROR', tags: ['Action'], totalSeries: 8, availableSeries: 5 },
  { title: 'Feed', description: 'In a post-apocalyptic world, the survivors must hide from creatures that hunt by sound.', image: 'https://picsum.photos/seed/ho6/400/600', category: 'HORROR', tags: ['Action', 'Adventure'], totalSeries: 11, availableSeries: 6 },
  { title: 'The Dollmaker', description: 'A mysterious artisan creates dolls that come to life — with deadly intentions.', image: 'https://picsum.photos/seed/ho7/400/600', category: 'HORROR', tags: ['Adventure'], totalSeries: 7, availableSeries: 4 },
  { title: 'Nightmare Loop', description: 'A man relives the worst night of his life over and over with no way to escape.', image: 'https://picsum.photos/seed/ho8/400/600', category: 'HORROR', tags: ['Action'], totalSeries: 9, availableSeries: 5 },
  { title: 'The Watcher', description: 'Someone is always watching — and the protagonist is starting to believe it.', image: 'https://picsum.photos/seed/ho9/400/600', category: 'HORROR', tags: ['Adventure'], totalSeries: 6, availableSeries: 4 },
  { title: 'Grave Shift', description: 'A night shift security guard at a cemetery starts experiencing things beyond explanation.', image: 'https://picsum.photos/seed/ho10/400/600', category: 'HORROR', tags: ['Action'], totalSeries: 8, availableSeries: 5 },
];

async function main() {
  await createUsers();
  await createCategories();
  await createTags();
  await createWebtoons();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅ Seed completed successfully!');
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createUsers() {
  await prisma.user.upsert({
    where: { username: 'superadmin' },
    update: {},
    create: Object.assign<any, any>(
      { firstName: 'Uztoon', lastName: 'Super', email: 'superadmin@gmail.com', username: 'superadmin', role: 'SUPER_ADMIN' },
      { password: await hashPassword('Password123') },
    ),
  });
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: Object.assign<any, any>(
      { firstName: 'Uztoon', lastName: 'Admin', email: 'admin@gmail.com', username: 'admin', role: 'ADMIN' },
      { password: await hashPassword('Password123') },
    ),
  });
  await prisma.user.upsert({
    where: { username: 'creator' },
    update: {},
    create: Object.assign<any, any>(
      { firstName: 'Uztoon', lastName: 'Creator', email: 'creator@gmail.com', username: 'creator', role: 'CREATOR' },
      { password: await hashPassword('Password123') },
    ),
  });
  await prisma.user.upsert({
    where: { username: 'client' },
    update: {},
    create: Object.assign<any, any>(
      { firstName: 'Uztoon', lastName: 'Client', email: 'client@gmail.com', username: 'client', role: 'CLIENT' },
      { password: await hashPassword('Password123') },
    ),
  });
}

async function createCategories() {
  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });
  }
}

async function createTags() {
  for (const tag of TAGS) {
    await prisma.tag.upsert({
      where: { name: tag },
      update: {},
      create: { name: tag },
    });
  }
}

async function createWebtoons() {
  const creator = await prisma.user.findUnique({ where: { username: 'creator' } });

  for (const webtoon of WEBTOONS) {
    const category = await prisma.category.findUnique({ where: { name: webtoon.category } });

    if (!creator || !category) continue;

    const existing = await prisma.webtoon.findFirst({ where: { title: webtoon.title } });
    if (existing) continue;

    const created = await prisma.webtoon.create({
      data: {
        title: webtoon.title,
        description: webtoon.description,
        image: webtoon.image,
        totalSeries: webtoon.totalSeries,
        availableSeries: webtoon.availableSeries,
        creatorId: creator.id,
        categoryId: category.id,
      },
    });

    for (const tagName of webtoon.tags) {
      const tag = await prisma.tag.findUnique({ where: { name: tagName } });
      if (tag) {
        await prisma.webtoonTag.upsert({
          where: { webtoonId_tagId: { webtoonId: created.id, tagId: tag.id } },
          update: {},
          create: { webtoonId: created.id, tagId: tag.id },
        });
      }
    }
  }
}