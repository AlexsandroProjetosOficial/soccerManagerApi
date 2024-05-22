import moment from 'moment';
import { AppError } from "../../../errors/AppErrors";
import type { IGames } from "../../../interfaces/game/IGames";
import type { IGamesResponse } from "../../../interfaces/game/IGamesResponse";
import type { IGetGameRequest } from "../../../interfaces/game/IGetGameRequest";
import { GameRepository } from "../../../repositories/game.repository";
import { categories } from "../../../utils/categories";
import { gameStatus } from '../../../utils/gameStatus';

class GetGamesUseCase {
  private gameRepository: GameRepository;

  constructor() {
    this.gameRepository = new GameRepository()
  }

  async execute({
    user,
    category
  }: IGetGameRequest): Promise<Array<IGamesResponse> | void> {
    try {
      console.log(user, category);
      const games: Array<IGames> = await this.gameRepository.findGamesByUserId({ user, category });

      const newGames = games.map(game => {
        const category = game.category.name as 'base' | 'professional' | 'amateur';
        const status = game.status as 'waiting' | 'completed';
        const matchOfficialTotal = game.Match_official.length;

        return {
          id: game.id,
          league: game.league.name,
          avatar: game.league.avatar,
          teams: `${game.team_home.name} x ${game.team_away.name}`,
          category: categories[category],
          nivel: game.category.name,
          date: `${moment(game.match_date, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM')} às ${moment(game.match_date, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm')}`,
          location: game.stadium.nickname,
          status: gameStatus[status],
          isAllArrived: game.Match_official.filter(matchOfficial => matchOfficial.referee_arrival_time).length === matchOfficialTotal
        }
      });

      console.log('newGames', newGames);

      return newGames;
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError({ message: error.message, statusCode: error.statusCode, errors: error.errors });
      }
    }
  }
}

export { GetGamesUseCase };
