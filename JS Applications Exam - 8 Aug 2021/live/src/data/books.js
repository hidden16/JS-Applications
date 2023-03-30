import { del, get, post, put } from "./api.js";

const endpoints = {
    books: '/data/books?sortBy=_createdOn%20desc',
    byId: '/data/books/'
}

export async function getAllBooks(){
    return get(endpoints.books);
}

export async function getById(id){
    return get(endpoints.byId + id);
}

export async function removeBook(id){
    return del(endpoints.byId + id);
}

export async function createBook(data){
    return post(endpoints.books, data);
}

export async function updateBook(id, data){
    return put(endpoints.byId + id, data);
}