import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import CategoryService from "../../../service/CategoryService";
import { Category } from "../../../domain/category";

export default function handler(req, res) {
    const categoryService = new CategoryService()

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).end();
    }

    try {
        jwt.verify(token, JWT_SECRET);

        switch (req.method) {
            case 'GET':
                const categories: Category[] = categoryService.getAllCategories()
                res.setHeader('Content-Type', 'application/json')
                res.status(200).json(categories)
                break;
        }
    } catch (err) {
        return res.status(401).end();
    }
}