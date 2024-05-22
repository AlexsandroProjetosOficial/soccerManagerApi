import { AppError } from "../../../errors/AppErrors";
import type { ITimesGame } from '../../../interfaces/game/ITimesGame';
import type { ITimesGameResponse } from '../../../interfaces/game/ITimesGameResponse';
import { GameRepository } from "../../../repositories/game.repository";

class GetTimesGameUseCase {
  private gameRepository: GameRepository;

  constructor() {
    this.gameRepository = new GameRepository()
  }

  async execute(game: string): Promise<ITimesGameResponse | void> {
    try {
      console.log(game);
      const timesGame: ITimesGame | null = await this.gameRepository.findTimesByGameId(game);

      const newTimesGame = {
        referee: {
          first: !!timesGame?.time_match_official_first_half,
          second: !!timesGame?.time_match_official_second_half,
        },
        home: {
          first: !!timesGame?.time_team_home_first_half,
          second: !!timesGame?.time_team_home_second_half,
        },
        away: {
          first: !!timesGame?.time_team_away_first_half,
          second: !!timesGame?.time_team_away_second_half,
        },
        match: {
          first: !!timesGame?.end_time_first_half,
          second: !!timesGame?.end_time_second_half
        }
      }

      console.log('newTimesGame', newTimesGame);

      return newTimesGame;
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError({ message: error.message, statusCode: error.statusCode, errors: error.errors });
      }
    }
  }
}

export { GetTimesGameUseCase };
