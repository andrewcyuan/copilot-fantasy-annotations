# Name

- The app is called Fantasy Football Annotator

# Users

Users are students who are competing in Dynasty fantasy football leagues, where teams are preserved between years, and draft picks are based on the performance of the past year.

# Value proposition

Users are able to mock trades where the placement of future draft picks is determined by a player’s best guess for end-of-season rankings. The app will display draft picks with the projected order of that pick alongside which year, round, and player the draft pick belongs to. 

# Key features

Three drag-and drop, rearrangeable ranking lists for 2025, 2026, and 2027 which each have the names of each fantasy team in the league
A teams draft pick for the year is decided by the inverse of the results of the previous year. For example, a team that is 1 for 2025, will have the 10th pick in 2026
A mock trade section with the following
A team selection drop down on the left and right
A list of all players and draft picks associated with the teams selected (one on the left and on on the right) with positions and color coded background to match the team the pick belongs to or the position the player plays
A center section in between the two list of teams that will show all selected players or picks from both teams which have been selected to be in the trade
A button represented by two arrows that when clicked swaps the assets selected with the other team
Draft picks will display a projected pick number based on the user’s rankings lists
Each team will have 3 picks for a given year
Pick numbers will be inverse of the rankings from the year before on the user’s ranking list with each subsequent pick adding 10 to it
Picks from one team might be associated with another team from a previous trade

# Example scenario

Team Warry is looking to trade his first 2026 draft pick for two players on Team Shark. Team Shark already has Team Warry’s 2026 second draft pick which is the number 20th pick since Team Warry is number 1 on the list for 2025. Team Shark also has two 28 first picks from other teams in the league. Both the players and the picks that both Team Warry and Team Shark have are displayed on the screen. Team Warry has selected to trade his 2026 10th pick while Team Shark has selected to trade WR Jameson Williams and TE Sam Laporta by clicking the circle in the upper right hand corner of where they are listed. Both Team Warry’s pick and Team Shark’s players are placed in the middle of the screen indicating they are currently selected to be traded. The double arrow button is clicked and Team Warry swaps his pick with Team Shark’s players. Team Warry now has WR Jameson Williams and TE Sam Laporta listed under his team. Team Shark now has Team Warry’s 2026 10th pick under his team. Team Warry’s team is moved from 1 in 2025 to 3 in 2025. The pick numbers on Team Warry’s picks update for both Team Warry and Team Shark. Team Warry now has the 2026 28th pick while Team Shark now has the 2026 8th pick and Team Warry 2026 18th pick.

# Coding notes

Use hardcoded data for the user’s team and the other teams in JSON.
For each team:
All players associated with that team, the positions of those players, and the color that they will display on the screen
All draft picks associated with that team including those that they have traded from another team in the past
Pick number inversely associated with the team position for the previous year
Color associated with the team the draft pick originally came from
Team name the pick originally came from



# Testing notes
- Define a test that confirms whether the inputted information per team remains associated with those teams across sessions
- Define a test that confirms whether picks are assigned correctly according to the year and ranking a team is assigned to
- Define a test that confirms the colors associated with a team are correctly associated with their picks