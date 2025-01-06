import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const BasicCard = () => {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const [randomValue, setRandomValue] = useState("");

  useEffect(() => {
    const myObject = {
      1: "My first ex-wife’s name is Tammy. My second ex-wife’s name is Tammy. My Mom’s name is Tamara… she goes by Tammy.",
      2: "I’m not interested in caring about people. I once worked with a guy for three years and never learned his name. Best friend I ever had. We still never talk sometimes.",
      3: "On my deathbed, my final wish is to have my ex-wives rush to my side so I can use my dying breath to tell them both to go to hell one last time.",
      4: "I love being a father but there are a few things I miss: Silence. The absence of noise. One single moment undisturbed by the sounds of a children’s program called Doc McStuffins.",
      5: "There has never been a sadness that can’t be cured by breakfast food.",
      6: "You had me at ‘Meat Tornado.’",
      7: "Why is everyone else so bad at eating?",
      8: "When I eat, it is the food that is scared.",
      9: "There’s only one thing I hate more than lying: skim milk. Which is water that’s lying about being milk.",
      10: "Strippers do nothing for me… but I will take a free breakfast buffet anytime, anyplace.",
      11: "I’m a simple man. I like pretty, dark-haired women and breakfast food.",
      12: "Dear frozen yogurt, you are the celery of desserts. Be ice cream, or be nothing.",
      13: "Clear alcohols are for rich women on diets.",
      14: "Put some alcohol in your mouth to block with words from coming out.",
      15: "Just give me all the bacon and eggs you have. Wait … I worry what you heard was, ‘Give me a lot of bacon and eggs.’ What I said was, give me all the bacon and eggs you have. Do you understand?",
      16: "I call this turf ‘n’ turf. It’s a 16-ounce T-bone and a 24-ounce porterhouse. Also, whiskey and a cigar. I am going to consume all of this at the same time because I am a free American.",
      17: "If there were more food and fewer people, this would be a perfect party.",
      18: "You’ve accidentally given me the food that my food eats.",
      19: "An ideal night out, to me, is stepping onto my porch area and grilling up a thick slab of something’s flesh and then popping in a highlight reel from the WNBA.",
      20: "Barbecues should be about one thing: good shared meat.",
      21: "Give 100%. 110% is impossible. Only idiots recommend that.",
      22: "There are only three ways to motivate people: money, fear, and hunger.",
      23: "There are three acceptable haircuts: high and tight, crew cut, buzz cut.",
      24: "Sting like a bee, but do not float like a butterfly. That’s ridiculous.",
      25: "One rage every three months is permitted. Try not to hurt anyone who doesn’t deserve it.",
      26: "Never half-ass two things. Whole-ass one thing.",
      27: "I’d wish you the best of luck, but I believe luck is a concept created by the weak to explain their failures.",
      28: "Don’t start chasing applause and acclaim. That way lies madness.",
      29: "If any of you need anything at all, too bad. Deal with your problems yourselves, like adults.",
      30: "I regret nothing. The end.",
      31: "Give a man a fish and feed him for a day. Don’t teach a man to fish…and feed yourself. He’s a grown man. And fishing’s not that hard.",
      32: "Keep your tears in your eyes—where they belong.",
      33: "I was born ready. I’m Ron F***ing Swanson.",
      34: "Normally, if given the choice between doing something and nothing, I’d choose to do nothing. But I will do something if it helps someone else do nothing. I’d work all night if it meant nothing got done.",
      35: "Friends: one to three is sufficient.",
      36: "Fishing is for sport only. Fish meat is practically a vegetable.",
      37: "Under my tutelage, you will grow from boys to men. From men into gladiators. And from gladiators into Swansons.",
      38: "That is a canvas sheet—the most versatile object known to man. It can be used to make tents, backpacks, shoes, stretchers, sails, tarpaulins, and I suppose, in the most dire of circumstances, it can be a surface on which to make art.",
      39: "There is only one bad word: taxes.",
      40: "There's more than one crib tree in a forest. That's not a lesson, by the way, just a comment on lumber availability.",
      41: "When people get too chummy with me, I like to call them by the wrong name to let them know I don’t really care about them.",
      42: "I’ve cried twice in my life. Once when I was 7 and hit by a school bus. And then again when I heard that Li’l Sebastian had passed.",
      43: "Capitalism: God’s way of determining who is smart and who is poor.",
      44: "Crying: Acceptable at funerals and the Grand Canyon.",
      45: "Fishing relaxes me. It’s like yoga, except I still get to kill something.",
      46: "Great job, everyone. The reception will be held in each of our individual houses, alone.",
      47: "History began on July 4, 1776. Everything that happened before that was a mistake.",
      48: "Literally everything is a weapon, son. That folder, in my hands, is far deadlier than this bow of yours.",
      49: "I have a hernia. I’ve had it for a while, and I’ve been ignoring it successfully. But uh, this morning, I made the mistake of sneezing. But as long as I sit still and don’t move my head or torso, I’m good. I got this.",
      50: "[On bowling] Straight down the middle. No hook, no spin, no fuss. Anything more and this becomes figure skating.",
      51: "[Describing his allergies] Cowardice and weak-willed men… and hazelnuts.",
      52: "Birthdays were invented by Hallmark to sell cards.",
      53: "Any dog under fifty pounds is a cat and cats are useless.",
      54: "I would rather bleed out than sit here and talk about my feelings for 10 minutes.",
    };

    function getRandomValueFromObject(obj) {
      const values = Object.values(obj);
      const randIndex = Math.floor(Math.random() * values.length);
      return values[randIndex];
    }

    setRandomValue(getRandomValueFromObject(myObject));
  }, []);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Ron Swanson quote of the day
        </Typography>

        <Typography variant="body2">{randomValue}</Typography>
      </CardContent>
      <CardActions>
        <a
          href="https://ron-swanson-quotes.herokuapp.com/v2/quotes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="small">Learn More</Button>
        </a>
      </CardActions>
    </Card>
  );
};

export default BasicCard;
