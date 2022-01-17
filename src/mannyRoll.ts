import {
  availableAmount,
  buy,
  cliExecute,
  inebrietyLimit,
  maximize,
  myGardenType,
  myInebriety,
  print,
  pvpAttacksLeft,
  retrieveItem,
  use,
  useFamiliar,
} from "kolmafia";
import { $familiar, $item, $items, ChateauMantegna, Clan, have } from "libram";
import { mannyCleanup, nightcap, randomPrank, randomSafari } from "./lib";

Clan.join("Alliance from Hell");

if (pvpAttacksLeft() > 0) {
  cliExecute("UberPvPOptimizer");
  cliExecute("swagger");
}

if (myInebriety() <= inebrietyLimit()) nightcap();

mannyCleanup();

randomSafari();
randomPrank();

if (myGardenType() !== "grass") {
  use(1, $item`packet of tall grass seeds`);
}

if (myGardenType() === "grass") {
  use($item`Poké-Gro fertilizer`); // fertilizer
  use($item`packet of thanksgarden seeds`);
}

buy($item`clockwork maid`, 1, 10000);

if (have($item`clockwork maid`)) {
  use($item`clockwork maid`);
}

if (ChateauMantegna.getCeiling() !== $item`artificial skylight`)
  ChateauMantegna.changeCeiling($item`artificial skylight`);

useFamiliar($familiar`Trick-or-Treating Tot`);
retrieveItem($item`li'l unicorn costume`);
maximize("adv", false);
Clan.join("Alliance From Hobopolis");

const beachrares = $items`meteorite fragment, cursed pirate cutlass, cursed swash buckle, cursed tricorn hat`;

for (const item of beachrares) {
  if (item === $item`cursed pirate cutlass`) {
    if (availableAmount(item) > 1) print(`holy shit you found a ${item}!`, "yellow");
  } else if (have(item)) print(`holy shit you found a ${item}!`);
}
