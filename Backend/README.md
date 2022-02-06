# Werewolf

## About
...

## Technology Used
We used MERN tech stack for this project. For the backend, we used TypeScript.

## Rules
A game generally requires 6 to 12 players and a host (commonly called God or Judge). The game is played in alternating phases of "night" and "day". The host is responsible for distributing character identities, handling the player's character skills, and the alternation of stages.

Each player will be given a character before the game starts. The game characters are mainly divided into two opposing camps: the "human" camp and the "werewolf" camp. There are several civilians and priests in the human camp. They don't know each other's identities. They need to use the abilities of priests and the player's language and expressions to distinguish between humans and werewolves in the village, to vote for exile and to use character skills. Eliminate the werewolves in other ways to win. The werewolf camp has a small number of people and mixes with the human camp to confuse people; they can meet each other every night and kill a player together. The werewolf camp needs to eliminate all civilians or priests to win.

After the end of the night every day, enter the day phase, all surviving players take turns to speak, and after everyone has finished speaking, they vote to exile a player.

## Role
`Sheriff`:
The role of Sheriff will be elected on the first night before the announcement of the night before the death. Players participating in the election will take turns to speak, and then players who have not run for Sheriff will vote for the Sheriff. The sheriff can arrange the order of speaking in the following day (police left/right: one player from the sheriff's left/right speaks clockwise/counterclockwise) and has the right to return the vote. In the exile referendum, the sheriff's vote is counted as 1.5 votes. The sheriff who is eliminated in any way can choose to hand over or tear up the badge.


#### Werewolf Camp
`Werewolf`:
Night can open his eyes to meet his teammates and discuss tactics and choose the target to kill. Werewolves can choose not to kill any players that night or kill themselves. Mixed into the village during the day to confuse good people. The werewolf can choose to announce the character card self-elimination at any time during the day and force it to enter the night phase and leave the field at the end of the night phase.

#### Human Camp
`Civilians`:
No special skills, eyes closed throughout the night phase, and players who are suspected of being a werewolf are voted to exile through the information obtained during the day phase

`Prophet`:
A priestly character. You can check the faction of a surviving player every night, and report information to good people by speaking during the day

`Sorceress`:
A priestly character. Have a bottle of antidote and a bottle of poison. When the antidote is not used, you can know who the werewolf killed and decide whether to save the player. However, the antidote cannot be used to save oneself at all times. The witch can also use the information obtained during the day to poison the suspected object, and the object cannot use the skills after death. Antidote and poison cannot be used on the same night.

`Hunter`:
A priestly role. In addition to being poisoned, when you are eliminated in any other way, you can announce the character card to activate skills and shoot a player away, or you can choose to suppress the gun and not activate skills.

`Idiot`:
A priestly role. If an idiot is cast in a daytime banishment referendum, a character card must be announced to be immune to the banishment, but he will lose his right to vote in subsequent banishment referendums.

`Guardian`:
A priestly role. You can choose to protect a player from being killed by werewolves every night, and you can choose to protect yourself or not, and you cannot protect the same player for two consecutive nights. If a player is killed by a werewolf, and the guard and the witch guard and use the antidote at the same time, the player will still die. The guard's protection cannot stop the witch's poison.



### Game flow
The host deals each player a character card. After the player confirms the character card, the game begins.

#### Night Stage
* The host announced, "It's getting dark, all players please close your eyes."
* The host wakes up the werewolf and chooses who to kill.
* After the werewolf closed his eyes, the clergymen were awakened in turn and performed their abilities.

#### Sheriff Campaign (only after the first dark night)
* The host said: "Now for the sheriff campaign, players who want to run for sheriff please raise your hand/stand up."
* After the players running for sheriff raised their hands/stands, the host announced, "It's dawn, all players please open your eyes."
* The moderator randomly selects the speaking order of the contesting players.
* After all the players who are running for the sheriff have finished speaking, they will enter the withdrawal link, and the players who withdraw will signal to the host.
* After withdrawing from the election, players who did not run for the sheriff can vote for the sheriff, and the sheriff will receive a police badge. If there is a tie, a PK speech will be made. If the vote is tied again or everyone abstains, the badge will be lost.
* Note: If all players are running for the sheriff, and after the police officer speaks and withdraws from the election, there is still more than one player who continues to campaign, the police badge will be lost.

#### Day Phase
* The host announced, "It's dawn, all players please open your eyes." And announced the news of last night's death. Except for the first player who died in the night, the players who died in the night have no last words.
* If the deceased has a special ability, you can choose to activate it.
* When the sheriff is present, the sheriff chooses the order of speech: police left and right, sheriff random, time order; if only one player died in the last night, you can choose to die left and right. If the badge is lost, the host will randomly select the speaking order.
* After all players have finished speaking, the sheriff can return the vote.
* A banishment referendum is held, and all surviving players (except idiots who have flipped) can vote. If there is a tie, a PK speech will be made, and no one will be exiled if the vote is tied again or everyone abstains.
* The exiled player can leave the game after saying his last words, and enter the night again until the winner is decided.
