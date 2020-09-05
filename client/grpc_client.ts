import { BookInterface, Book } from './BookInterface';
import grpc, { GrpcObject } from 'grpc';

class GrpcClient implements BookInterface {
    private client: any;
    private booksProto: GrpcObject;

    constructor(ip: string, port: number | string) {
        this.booksProto = grpc.load('books.proto');
        this.client = new (this.booksProto.books as any).BookService(`${ip}:${port}`, grpc.credentials.createInsecure());
    }

    async list(): Promise<Book[]> {
        return new Promise((resolve, reject) => {
            this.client.list({}, (error: Error, books: Book[]) => {
                if (error) reject(error);
                resolve(books);
            });
        });
    }

    async insert(book: Book): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.insert(book, (error: Error) => {
                if (error) reject(error);
                resolve();
            });
        });
    }

    async findById(id: number): Promise<Book> {
        return new Promise((resolve, reject) => {
            this.client.get({ id }, (error: Error, book: Book) => {
                if (error) reject(error);
                resolve(book);
            })
        })
    }

    async delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete({ id }, (error: Error) => {
                if (error) reject(error);
                resolve();
            })
        })
    }
}

async function run() {
    let processName = process.argv.shift();
    let scriptName = process.argv.shift();
    let command = process.argv.shift();

    let grpcClient = new GrpcClient('127.0.0.1', 50051);

    if (command == 'list')
        console.log(await grpcClient.list());
    else if (command == 'insert')
        console.log(await grpcClient.insert({
            id: parseInt(process.argv[0]),
            title: process.argv[1],
            author: process.argv[2],
        }));
    else if (command == 'get')
        console.log(await grpcClient.findById(parseInt(process.argv[0])));
    else if (command == 'delete')
        console.log(await grpcClient.delete(parseInt(process.argv[0])));
}

run();
