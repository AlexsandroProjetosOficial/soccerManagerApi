import { AppError } from "../../../errors/AppErrors";
import type { ITimesGame } from "../../../interfaces/game/ITimesGame";
import type { ITimesGameResponse } from "../../../interfaces/game/ITimesGameResponse";
import type { IUpdateGameRequest } from "../../../interfaces/game/IUpdateGameRequest";
import { GameRepository } from "../../../repositories/game.repository";

class UpdateGameUseCase {
  private gameRepository: GameRepository;

  constructor() {
    this.gameRepository = new GameRepository()
  }

  async execute({
    game,
    column,
    value
  }: IUpdateGameRequest): Promise<ITimesGameResponse | void> {
    try {
      const timesGameUpdated = await this.gameRepository.updateGameById({ game, column, value });

      if (!timesGameUpdated) throw new AppError({ message: 'Não foi possivel registrar o horário.', statusCode: 400, errors: [] });

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

      return newTimesGame;
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError({ message: error.message, statusCode: error.statusCode, errors: error.errors });
      }
    }
  }
}

export { UpdateGameUseCase };
