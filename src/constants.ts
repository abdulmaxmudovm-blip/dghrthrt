export interface WordEntry {
  word: string;
  hint: string;
  category: string;
}

export const WORD_LIST: WordEntry[] = [
  { word: "GALAXY", hint: "A massive system of stars, gas, and dust.", category: "Space" },
  { word: "NEBULA", hint: "A cloud of gas and dust in outer space.", category: "Space" },
  { word: "PLANET", hint: "A celestial body moving in an elliptical orbit around a star.", category: "Space" },
  { word: "COMET", hint: "A celestial object consisting of a nucleus of ice and dust.", category: "Space" },
  { word: "ASTEROID", hint: "A small rocky body orbiting the sun.", category: "Space" },
  { word: "METEOR", hint: "A small body of matter from outer space that enters the earth's atmosphere.", category: "Space" },
  { word: "TELESCOPE", hint: "An instrument used to see distant objects.", category: "Science" },
  { word: "GRAVITY", hint: "The force that attracts a body toward the center of the earth.", category: "Science" },
  { word: "ORBIT", hint: "The curved path of a celestial object around a star, planet, or moon.", category: "Science" },
  { word: "SATELLITE", hint: "An artificial body placed in orbit around the earth or moon.", category: "Science" },
  { word: "COSMOS", hint: "The universe seen as a well-ordered whole.", category: "Philosophy" },
  { word: "ASTRONAUT", hint: "A person who is trained to travel in a spacecraft.", category: "People" },
  { word: "ECLIPSE", hint: "An obscuring of the light from one celestial body by another.", category: "Phenomena" },
  { word: "SUPERNOVA", hint: "A star that suddenly increases greatly in brightness because of a catastrophic explosion.", category: "Phenomena" },
  { word: "BLACKHOLE", hint: "A region of space having a gravitational field so intense that no matter can escape.", category: "Phenomena" },
  { word: "UNIVERSE", hint: "All existing matter and space considered as a whole.", category: "General" },
  { word: "SPACESHIP", hint: "A vehicle used for traveling in space.", category: "Technology" },
  { word: "ROCKET", hint: "A cylindrical projectile that can be propelled to a great height.", category: "Technology" },
  { word: "STARLIGHT", hint: "The light that comes from a star.", category: "Nature" },
  { word: "HORIZON", hint: "The line at which the earth's surface and the sky appear to meet.", category: "General" },
];
