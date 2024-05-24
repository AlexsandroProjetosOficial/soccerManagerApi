import z from "zod";

const LoginSchema = z.object({
  email: z.string().email().regex(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: 'E-mail inválido.',
    }
  ),
  password: z.string().min(8).max(15)
});

const CreateUserSchema = z.object({
  email: z
    .string({
      required_error: 'O campo e-mail é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      {
        message: 'E-mail inválido.',
      }
    ),
  firstName: z
    .string({
      required_error: 'O campo nome é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  lastName: z
    .string({
      required_error: 'O campo sobrenome é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  password: z
    .string({
      required_error: 'O campo senha é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
    .min(8, 'Devera conter no minimo 8 caracteres')
    .max(16, 'Devera conter no maximo 16 caracteres'),
  phone: z
    .string({
      required_error: 'O campo telefone é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  avatar: z
    .string({
      required_error: 'O campo avatar é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
})

const GetGamesSchema = z.object({
  user: z
    .string({
      required_error: 'O campo identificador do usuário é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  category: z
    .string({
      required_error: 'O campo categoria é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
})

const GetOfficialsSchema = z.object({
  game: z
    .string({
      required_error: 'O campo Identificador do jogo é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
})

const UpdatedOfficialSchema = z.object({
  matchOfficial: z
    .string({
      required_error: 'O campo Identificador do official da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  game: z
    .string({
      required_error: 'O campo Identificador do jogo é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
})

const UpdateGameSchema = z.object({
  game: z
    .string({
      required_error: 'O campo Identificador da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  column: z
    .string({
      required_error: 'O campo coluna é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  value: z
    .string({
      required_error: 'O campo valor é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
})

const GetTimesGameSchema = z.object({
  game: z
    .string({
      required_error: 'O campo Identificador da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
})

const GetDetailsGameSchema = z.object({
  game: z
    .string({
      required_error: 'O campo Identificador da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
})

const DeleteDetailsGameSchema = z.object({
  detailGame: z
    .string({
      required_error: 'O campo Identificador do detalhe da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  game: z
    .string({
      required_error: 'O campo Identificador da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
})

const UpdateGameDetailSchema = z.object({
  game: z
    .string({
      required_error: 'O campo Identificador da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  gameDetail: z
    .string({
      required_error: 'O campo Identificador do detalhe da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  column: z
    .string({
      required_error: 'O campo Identificador da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  value: z
    .string({
      required_error: 'O campo Identificador da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    })
})

const PostDetailsGameSchema = z.object({
  game: z
    .string({
      required_error: 'O campo Identificador da partida é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  team: z
    .string({
      required_error: 'O campo Identificador do time é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  playerRegisterCardOne: z
    .string({
      required_error: 'O campo número do jogador é obrigatório.',
      invalid_type_error: 'O campo somente aceita número.',
    }),
  playerRegisterCardTwo: z
    .string({
      required_error: 'O campo número do jogador é obrigatório.',
      invalid_type_error: 'O campo somente aceita número.',
    }),
  half: z
    .string({
      required_error: 'O campo tempo é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  result: z
    .string({
      required_error: 'O campo minuto é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  type: z
    .string({
      required_error: 'O campo motivo é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
  stop: z
    .string({
      required_error: 'O campo parada é obrigatório.',
      invalid_type_error: 'O campo somente aceita string.',
    }),
})

export {
  LoginSchema,
  CreateUserSchema,
  GetGamesSchema,
  GetOfficialsSchema,
  UpdatedOfficialSchema,
  UpdateGameSchema,
  GetTimesGameSchema,
  GetDetailsGameSchema,
  PostDetailsGameSchema,
  DeleteDetailsGameSchema,
  UpdateGameDetailSchema
}