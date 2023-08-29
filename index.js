//* Please install 'better-comments' extension!
//! You will see these 3 lines all over my code for testing
//? From line 34 ~ 36 And 48 ~ 51 o.O
//  You will only enjoy these console logs/tables on VsCode Terminal
//? Know that I put a closing square bracket ']' after the 7th joke and commented on the rest
//! Do not format this code. I've tried so hard to make it readable the best I can
// TODO 0: After Installing Better Comments extension you may begin
//// If you have any questions feel free to ask ChatLGPT -.^

import express from "express"

const app = express()
const port = 3000
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT"

app.use(express.urlencoded({ extended: true }))

//TODO 1: GET a random joke, one-liner!
app.get("/random", (req, res) => res.send(jokes[Math.floor(Math.random() * jokes.length)]))

//TODO :2 GET a specific joke, one-liner!
app.get("/jokes/:id", (req, res) => res.send(jokes[parseInt(req.params.id) - 1]))

//TODO 3: GET jokes by filtering on the joke type, one-liner!
app.get("/filter", (req, res) => res.send(jokes.filter((joke) => joke.jokeType === req.query.type)))

//TODO 4: POST a new joke with 5 solutions, try them all together!
app.post("/jokes", (req, res) => {
  const newJoke = {
    id: jokes.length + 1,
    jokeText: req.body.text,
    jokeType: req.body.type,
  }
  console.log("\u001b[93m" + "\n                                                 " + 
    "Original Array table of Objects\n \u001b[0m")
  console.table(jokes)

  jokes.push(newJoke)
  /* 
  ! These are four more ways to do it!
  /*
    jokes = jokes.concat(newJoke)
    jokes.splice(jokes.length, 0, newJoke)
    jokes[jokes.length] = newJoke
    jokes = [...jokes, newJoke]
  */

  console.log("\u001b[95m" + "\n                                                 " +
    "Modified Array table of Objects\n \u001b[0m")
  console.table(jokes)
  console.log("The new modified joke at the index", jokes.length, jokes.slice(-1))
  res.json({ Hint: `Open your vsCode Terminal` })
})

//TODO 5: PUT a joke with 2 solutions, try them both one by one!

app.put("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const foundJoke = jokes.find((joke) => joke.id === id)

  console.log("\u001b[93m" + "\n                                                 " + 
    "Original Array table of Objects\n \u001b[0m")
  console.table(jokes)

  //? Check if the joke was found
  if (foundJoke) {
    //? Check if both properties exist and have values that are not
    //? falsy (e.g., null, undefined, false, 0, "", or NaN).
    if (req.body.text && req.body.type) {
      foundJoke.jokeText = req.body.text
      foundJoke.jokeType = req.body.type
    }
  }

  console.log("\u001b[95m" + "\n                                                 " +
    "Modified Array table of Objects\n \u001b[0m")
  console.table(jokes)
  console.log("The new modified joke", "At the index", id, foundJoke)
  res.json({ Hint: `Open your vsCode Terminal` })

  /*
  ! The second solution, don't forget to comment the first one first!
  */
  /*
  const id = parseInt(req.params.id)
  const replacementJoke = {
    id: id,
    jokeText: req.body.text,
    jokeType: req.body.type,
  }

  const searchIndex = jokes.findIndex((joke) => joke.id === id)

  console.log("\u001b[93m" + "\n                                                 " + 
    "Original Array table of Objects\n \u001b[0m")
  console.table(jokes)

  //? The joke is found
  if (searchIndex !== -1) {
    //? Check if both properties exist and have values that are not
    //? falsy (e.g., null, undefined, false, 0, "", or NaN).
    if (req.body.text && req.body.type) {
      jokes[searchIndex] = replacementJoke
    }
  }

  console.log("\u001b[95m" + "\n                                                 " +
    "Modified Array table of Objects\n \u001b[0m")
  console.table(jokes)
  console.log("The new modified joke", "At the index", id, replacementJoke)
  res.json({ Hint: `Open your vsCode Terminal` })
  */
})

//TODO 6: PATCH a joke with 2 solutions, try them both one by one!

//* Note that this if statements technique is called guard closes
//* Unlike the second solution, you won't see many 'else' statements
//* This means no nesting conditions and more readable code
//* I could've made them all one-liners, so feel free to try that out

app.patch("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const foundJoke = jokes.find((joke) => joke.id === id)

  if (!foundJoke) {
    return res.status(404).json({ error: "Joke not found" })
  }

  //? Check if req.body is not an empty object
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty" })
  }
  //* object destructing
  const { text, type } = req.body

  //? Chek if at least one of them or both exist and have values...etc!
  if (!text && !type) {
    return res.status(400).json({ error: "You must provide at least 'text' or 'type'" })
  }

  console.log("\u001b[93m" + "\n                                                 " + 
    "Original Array table of Objects\n \u001b[0m")
  console.table(jokes)

  //? To prevent passing undefined values
  if (text) {
    foundJoke.jokeText = text
  }
  if (type) {
    foundJoke.jokeType = type
  }

  console.log("\u001b[95m" + "\n                                                 " +
    "Modified Array table of Objects\n \u001b[0m")
  console.table(jokes)
  console.log("The new updated joke", "At the index", id, foundJoke)
  res.json({ message: "Joke updated successfully", Hint: `Open your vsCode Terminal` })

  /*
  ! The second solution, don't forget to comment the first one first!
  */
  /*
  const id = parseInt(req.params.id)
  const foundJoke = jokes.find((joke) => joke.id === id)

  //? Check if the joke is found
  if (foundJoke) {
    //? Check if at least one of the fields exists
    if (req.body.text || req.body.type) {
      console.log("\u001b[93m" + "\n                                                 " + 
      "Original Array table of Objects\n \u001b[0m")
      console.table(jokes)
      //* Update the joke text if req.body.text is defined
      if (req.body.text) {
        foundJoke.jokeText = req.body.text
      }

      //* Update the joke type if req.body.type is defined
      if (req.body.type) {
        foundJoke.jokeType = req.body.type
      }
      console.log("\u001b[95m" + "\n                                                 " +
      "Modified Array table of Objects\n \u001b[0m")
      console.table(jokes)
      console.log("The new updated joke", "At the index", id, foundJoke)
      res.json({ message: "Joke updated successfully", Hint: `Open your vsCode Terminal` })
    } else {
      res.status(400).json({ error: "You must provide at least 'text' or 'type'" })
    }
  } else {
    res.status(404).json({ error: "Joke not found" })
  }
  */
})

//TODO 7: DELETE Specific joke

app.delete("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const searchIndex = jokes.findIndex((joke) => joke.id === id)
  console.log("\u001b[93m" + "\n                                                 " + 
    "Original Array table of Objects\n \u001b[0m")
  console.table(jokes)
  if (searchIndex > -1) {
    jokes.splice(searchIndex, 1)
    console.log("\u001b[95m" + "\n                                                 " +
    "Modified Array table of Objects\n \u001b[0m")
    console.table(jokes)
    res.sendStatus(200)
  } else {
    res.status(404).json({ error: `Joke with id: ${id} not found. No jokes were deleted.` })
  }
})

//TODO 8: DELETE All jokes

app.delete("/all", (req, res) => {
  const userKey = req.query.key || req.headers.key
  console.log("\u001b[93m" + "\n                                                 " + 
    "Original Array table of Objects\n \u001b[0m")
  console.table(jokes)
  if (userKey === masterKey) {
    jokes = []
    console.log("\u001b[95m" + "\n                                                 " +
    "Modified Array table of Objects\n \u001b[0m")
    console.table(jokes)
    res.send(jokes)
  } else {
    res.status(401).json({ error: `You are not authorised to perform this action.` })
  }
})

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`)
})

var jokes = [
  {
    id: 1,
    jokeText:
      "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: "Science",
  },
  {
    id: 2,
    jokeText:
      "Why did the scarecrow win an award? Because he was outstanding in his field.",
    jokeType: "Puns",
  },
  {
    id: 3,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 4,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 5,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 6,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 7,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
]
/*
  {
    id: 8,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 9,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 10,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 11,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 12,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 13,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 14,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 15,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 16,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 17,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 18,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 19,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 20,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 21,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 22,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 23,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 24,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 25,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 26,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 27,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 28,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 29,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 30,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 31,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 32,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 33,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 34,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 35,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 36,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 37,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 38,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 39,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 40,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 41,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 42,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 43,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 44,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 45,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 46,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 47,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 48,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 49,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 50,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 51,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 52,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 53,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 54,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 55,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 56,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 57,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 58,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 59,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 60,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 61,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 62,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 63,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 64,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 65,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 66,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 67,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 68,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 69,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 70,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 71,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 72,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 73,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 74,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 75,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 76,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 77,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 78,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 79,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 80,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 81,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 82,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 83,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 84,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 85,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 86,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 87,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 88,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 89,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 90,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 91,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 92,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 93,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 94,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 95,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 96,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 97,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 98,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 99,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 100,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
]
*/
