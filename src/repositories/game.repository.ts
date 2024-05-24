import moment from "moment";
import type { IGameDetails } from "../interfaces/game/IGameDetails";
import type { IGameRepository } from "../interfaces/game/IGameRepository";
import type { IGames } from "../interfaces/game/IGames";
import type { IGetGameRequest } from "../interfaces/game/IGetGameRequest";
import type { IGetOfficialsRequest } from "../interfaces/game/IGetOfficialsRequest";
import type { IOfficials } from "../interfaces/game/IOfficials";
import type { IPostDetailsGameRequest } from "../interfaces/game/IPostDetailsGameRequest";
import type { ITimesGame } from "../interfaces/game/ITimesGame";
import type { ITypeColumns } from "../interfaces/game/ITypeColumns";
import type { ITypeColumnsGameDetail } from "../interfaces/game/ITypeColumnsGameDetail";
import type { IUpdateGameDetailRepositoryRequest } from "../interfaces/game/IUpdateGameDetailRepositoryRequest";
import type { IUpdateGameRequest } from "../interfaces/game/IUpdateGameRequest";
import type { IUpdateOfficialRequest } from "../interfaces/game/IUpdateOfficialRequest";
import { prisma } from "../prisma/prisma";

class GameRepository implements IGameRepository {
  async updateGameDetailById({ gameDetail, column, value }: IUpdateGameDetailRepositoryRequest): Promise<boolean> {
    const columnValue = {
      'type': value,
      'player_number_one': Number(value),
      'player_number_two': Number(value),
      'time': (value.split(':').map(Number)[0] * 60 * 1000) + (value.split(':').map(Number)[1] * 1000),
      'stop': value,
      'is_confirmed': Boolean(value),
    }

    if (column === 'first_half') {
      const [gameDetailOne, gameDetailTwo] = await Promise.all([
        await prisma.game_detail.update({
          where: {
            id: gameDetail
          },
          data: {
            'first_half': true
          }
        }),
        await prisma.game_detail.update({
          where: {
            id: gameDetail
          },
          data: {
            'second_half': null
          }
        })
      ]);

      return !!(!!gameDetailOne && !!gameDetailTwo)
    }

    if (column === 'second_half') {
      const [gameDetailOne, gameDetailTwo] = await Promise.all([
        await prisma.game_detail.update({
          where: {
            id: gameDetail
          },
          data: {
            'first_half': null
          }
        }),
        await prisma.game_detail.update({
          where: {
            id: gameDetail
          },
          data: {
            'second_half': true
          }
        })
      ]);

      return !!(!!gameDetailOne && !!gameDetailTwo)
    }

    const gameDetailUpdated = await prisma.game_detail.update({
      where: {
        id: gameDetail
      },
      data: {
        [column]: columnValue[column as ITypeColumnsGameDetail]
      }
    });

    console.log('timesGame', gameDetailUpdated);
    return !!gameDetailUpdated;
  }

  async deleteGameDetailByDetalID(detailGame: string): Promise<boolean> {
    const gameDetailDeleted = await prisma.game_detail.delete({
      where: {
        id: detailGame
      }
    });

    return !!gameDetailDeleted;
  }

  async postGameDetailsByGameId({ game, team, type, playerRegisterCardOne, playerRegisterCardTwo, result, stop, half }: IPostDetailsGameRequest): Promise<boolean> {
    const data = {}
    const time = (result.split(':').map(Number)[0] * 60 * 1000) + (result.split(':').map(Number)[1] * 1000);

    if (half === 'firstHalf') {
      Object.assign(data, {
        first_half: true
      })
    } else {
      Object.assign(data, {
        second_half: true
      })
    }

    if (type === 'substitution') {
      Object.assign(data, {
        player_number_two: Number(playerRegisterCardTwo),
        stop,
      })
    }

    const detailsGameRegistered = await prisma.game_detail.create({
      data: {
        game_id: game,
        team_id: team,
        type: type,
        player_number_one: Number(playerRegisterCardOne),
        time: time,
        ...data
      }
    });

    return !!detailsGameRegistered;
  }

  async findGameDetailsByGameId(game: string): Promise<IGameDetails | null> {
    console.log(game);
    const detailsGame = await prisma.game.findFirst({
      select: {
        team_home: {
          select: {
            id: true,
            avatar: true,
            name: true,
            Game_detail: {
              select: {
                id: true,
                type: true,
                player_number_one: true,
                player_number_two: true,
                time: true,
                stop: true,
                first_half: true,
                second_half: true,
                is_confirmed: true
              },
              where: {
                game_id: game
              }
            },
          },
        },
        team_away: {
          select: {
            id: true,
            avatar: true,
            name: true,
            Game_detail: {
              select: {
                id: true,
                type: true,
                player_number_one: true,
                player_number_two: true,
                time: true,
                stop: true,
                first_half: true,
                second_half: true,
                is_confirmed: true
              },
              where: {
                game_id: game
              }
            }
          }
        }
      },
      where: {
        id: game
      }
    });

    console.log('detailsGame', detailsGame);

    return detailsGame;
  }

  async findTimesByGameId(game: string): Promise<ITimesGame | null> {
    const timesGame = await prisma.game.findFirst({
      select: {
        time_match_official_first_half: true,
        time_match_official_second_half: true,
        time_team_home_first_half: true,
        time_team_home_second_half: true,
        time_team_away_first_half: true,
        time_team_away_second_half: true,
        end_time_first_half: true,
        end_time_second_half: true
      },
      where: {
        id: game
      }
    });

    return timesGame;
  };

  async updateGameById({ game, column, value }: IUpdateGameRequest): Promise<boolean> {
    const columnValue = {
      'additional_time_first_half': Number(value),
      'additional_time_second_half': Number(value),
      'status': value
    }

    const timesGame = await prisma.game.update({
      where: {
        id: game
      },
      data: {
        [column]: columnValue[column as ITypeColumns] || moment(value).toDate()
      }
    });

    console.log('timesGame', timesGame);
    return !!timesGame
  };

  async updateOfficialById({ matchOfficial }: IUpdateOfficialRequest): Promise<boolean> {
    const matchOfficialUpdated = await prisma.match_official.update({
      where: {
        id: matchOfficial
      },
      data: {
        referee_arrival_time: moment().toDate()
      }
    });

    console.log('matchOfficialUpdated', matchOfficialUpdated);
    return !!matchOfficialUpdated
  };

  async findOfficialsByGameId({ game }: IGetOfficialsRequest): Promise<IOfficials[]> {
    const officials = await prisma.match_official.findMany({
      select: {
        id: true,
        referee_arrival_time: true,
        referee: {
          select: {
            avatar: true,
            name: true,
            phone: true,
            position: true
          }
        }
      },
      where: {
        game_id: game
      }
    });

    return officials;
  };

  async findGamesByUserId({ user, category }: IGetGameRequest): Promise<Array<IGames>> {
    const games = await prisma.game.findMany({
      select: {
        id: true,
        match_date: true,
        status: true,
        category: {
          select: {
            name: true
          }
        },
        league: {
          select: {
            avatar: true,
            name: true
          }
        },
        stadium: {
          select: {
            nickname: true
          }
        },
        team_home: {
          select: {
            name: true
          }
        },
        team_away: {
          select: {
            name: true
          }
        },
        Match_official: {
          select: {
            referee_arrival_time: true
          }
        }
      },
      where: {
        user_id: user,
        category: {
          name: category
        }
      }
    })

    console.log('games', category, games[1]);

    return games;
  };
};

export { GameRepository };