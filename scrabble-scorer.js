// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
   1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
   2: ["D", "G"],
   3: ["B", "C", "M", "P"],
   4: ["F", "H", "V", "W", "Y"],
   5: ["K"],
   8: ["J", "X"],
   10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
//   console.log("Let's play some scrabble! Enter a word:");
   let inicialWord = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   return inicialWord;
}

// let simpleScorer;
function simpleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints ++;
   }
   return letterPoints;
}

// let vowelBonusScorer;
function vowelBonusScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      if (word[i] === "a" || word[i] === "e" || word[i] === "i" || word[i] === "o" || word[i] === "u") {
         letterPoints += 3;
      } else {
         letterPoints ++;
      }
   }
   return letterPoints;
}

// let scrabbleScorer;
function scrabbleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      for (const item in newPointStructure) {
         if (item.includes(word[i])) {
            letterPoints += newPointStructure[item];
         }
      }
   }
   return letterPoints;
}

const scoringAlgorithms = [
   {
      name: "Simple Scorer",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   }, 
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts and consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }, 
   ];

function scorerPrompt(array, word) {
   console.log("Which scoring algorithm would you like to use?");
   console.log("0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system");
   let algorithmChosen= input.question("Enter 0, 1, or 2: ");
   algorithmChosen = Number(algorithmChosen);
   let points = array[algorithmChosen].scorerFunction(word);
   return `Score for '${word}': ${points}`
}

function transform(object) {
   let newObject = {};
   for (const item in object) {
      for (let i = 0; i < object[item].length; i++){
         newObject[object[item][i].toLowerCase()] = Number(item);
      }
   }
   return newObject;
   }

let newPointStructure = transform(oldPointStructure);



function runProgram() {
   let newWord = initialPrompt();
   // console.log(oldScrabbleScorer(newWord));
   // console.log(simpleScorer("banana"));
   // console.log(vowelBonusScorer("banana"));
   console.log(scorerPrompt(scoringAlgorithms, newWord));
   // console.log(transform(oldPointStructure))
   // console.log(scrabbleScorer(newWord));

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
