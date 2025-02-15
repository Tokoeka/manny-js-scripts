/*
--set timer
1-mafia breakfast*
2-breakfast script*
3-synth with untradeables
4-CONSUME ALL (buy melange first)*
5-garbo ascend*
6-CONSUME NIGHTCAP*
7-garbo ascend*
8-hccsPre*
9-hccsAscend*
10-mannyLoop*
11-postloop*
12-buy melange
13-synth with untradeables
13a-drink astral pils?
14-CONSUME ALL
15-garbo
16-mannyRoll (check the nightcap code)
--print time
*/

import {
  cliExecute,
  inebrietyLimit,
  myAdventures,
  myDaycount,
  myInebriety,
  myPath,
} from "kolmafia";
import { Clan, get } from "libram";
import { abort } from "./lib";

/*
class dailyStep {
  name: string;
  startTest: () => boolean;
  startError: string;
  run: (scriptName: string) => void; // TODO: this part needs to do something
  endTest: () => boolean;
  endError: string;

  constructor(
    name: string,
    startTest: () => boolean,
    startError: string,
    run: () => void,
    endTest: () => boolean,
    endError: string
  ) {
    this.name = name;
    this.startTest = startTest;
    this.startError = startError;
    this.run = run;
    this.endTest = endTest;
    this.endError = endError;
  }
}

new dailyStep(
  "breakfast",
  () => get("breakfastCompleted"),
  "You haven't done mafia breakfast yet",
  () => cliExecute("mannyBreakfast"),
  () => !get("_volcanoItemRedeemed") && get("_volcanoItem1") !== 0,
  "Looks like the breakfast script didn't finish"
);
*/
// breakfast
if (myDaycount() > 1) {
  if (myInebriety() < 1) {
    Clan.join("Alliance From Hell");

    // theoretically we do this on login, but just in case
    if (get("breakfastCompleted") === false) {
      cliExecute("breakfast");
    }
    if (get("_cargoPocketEmptied") === false && get("_dinseyGarbageDisposed") === false) {
      cliExecute("mannyBreakfast");
    }
  }

  if (!get("_volcanoItemRedeemed") && get("_volcanoItem1") === 0) {
    abort(`Something went wrong in the breakfast script`);
  }

  // check if we successfully ate/drank and then run garbo, making sure we have access to a pantsgiving and katana
  if (myAdventures() > 0 && myInebriety() < inebrietyLimit()) {
    cliExecute("garbo ascend yachtzeechain");
  }
}

// if garbo is done running, time to nightcap and run it again
// TODO: When switching to garbo diet, this should be CONSUME NIGHTCAP NOMEAT
if (myAdventures() > 0) {
  abort(`Looks like garbo broke, you still have turns.`);
} else {
  cliExecute("overdrink");
  if (myInebriety() > inebrietyLimit()) {
    cliExecute("garbo ascend");
  } else {
    abort(`Something went wrong nightcapping`);
  }
}

// now we get ready to loop
if (myInebriety() > inebrietyLimit() && myAdventures() === 0) {
  cliExecute("hccsAscend");
} else abort(`You either failed to nightcap or still have turns left`);

// Check that we made it into CS and then run the loop script
if (myPath() === "Community Service") {
  cliExecute("mannyLoop");
} else abort(`You should be in CS and you're not`);

// Now we should be done looping, so run the postloop and mafia breakfast
if (myPath() === "None" && myDaycount() === 1) {
  cliExecute("postloop");
} else abort(`Something went wrong and you didn't finish the loop`);

// if we are in casual and done with breakfast, time to do diet
if (myPath() === "None" && get("breakfastCompleted") && myAdventures() > 0) {
  cliExecute("garbo yachtzeechain");
}

// Check to make sure garbo finished running (aka that we have no adventures left)
// if so, burn pvp fights and run rollover script
if (myAdventures() !== 0) {
  abort(`garbo doesn't seem to have finished properly`);
} else {
  cliExecute("UberPVPOptimizer; swagger");
  cliExecute("mannyRoll");
}

/* Drop a status message in a text file that can be read from a powershell session
if (myDaycount() === 1 && myInebriety() > inebrietyLimit() && myAdventures() < 100) {
  bufferToFile("Success!", "wrapperresult.txt");
} else {
  bufferToFile("Something went wrong.", "wrapperresult.txt");
}
*/
cliExecute("exit");
