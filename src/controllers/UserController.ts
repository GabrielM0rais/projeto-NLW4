import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        try {
            await schema.validate(req.body, { abortEarly: false});
        } catch (err) {
            throw new AppError(err)
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExist = await usersRepository.findOne({email})
        if(userAlreadyExist) {
            throw new AppError("User already exists");
        }

        const user = usersRepository.create({name, email})

        await usersRepository.save(user);

        return res.status(201).json(user);
    }

    async show(req: Request, res: Response) {
        const surveysRepository = getCustomRepository(UsersRepository);

        const all = await surveysRepository.find();

        return res.json(all);
    }
}

export { UserController };

