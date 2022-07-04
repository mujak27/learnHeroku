import { extendType, intArg, nonNull, objectType, stringArg, subscriptionField } from "nexus";
import { NexusGenObjects } from "./typedefs";


export const Book = objectType({
  name: 'book',
  definition(t) {
    t.nonNull.id('id'),
    t.nonNull.string('name'),
    t.nonNull.int('authorId')
  }
})

let books : NexusGenObjects['book'][] = [
	{ id: '1', name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: '2', name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: '3', name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: '4', name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: '5', name: 'The Two Towers', authorId: 2 },
	{ id: '6', name: 'The Return of the King', authorId: 2 },
	{ id: '7', name: 'The Way of Shadows', authorId: 3 },
	{ id: '8', name: 'Beyond the Shadows', authorId: 3 }
]

export const BookQuery = extendType({
	type: 'Query',
	definition(t){
		t.nonNull.list.nonNull.field('book', {
			type: 'book',
			args:{
				id : stringArg(),
			},
			resolve(parent, args : any, context, info){
				// return books.filter(book=>  book.id == args.id);
				if(args.id) return books.filter(book=>{return book.id == args.id});
				return books;
			}
		})
	}
})


export const BooksQuery = extendType({
	type: 'Query',
	definition(t){
		t.nonNull.list.nonNull.field('books', {
			type: 'book',
			resolve(parent, args : any, context, info){
				return books;
			}
		})
	}
})


export const BookMutation = extendType({
	type: 'Mutation',
	definition(t){
		t.nonNull.field('book', {
			type: 'book',
			args:{
				id : nonNull(stringArg()),
				name : nonNull(stringArg()),
				authorId : nonNull(intArg()),
			},
			resolve(parent, args, context){
				const {id, name, authorId} = args;
				books.push({id, name, authorId});
				return {id, name, authorId};
			}
		})
	}
})

// export const BookSubscribe = extendType({
// 	type: 'Subscription',
// 	definition: {
		
// 	}
// })

// export const BookSubscription = subscriptionField('book', {
//   type: 'book',
//   subscribe() {
//     return (async function*() {
//       while (true) {
//         await new Promise(res => setTimeout(res, 1000))
//         yield Math.random() > 0.5
//       }
//     })()
//   },
//   resolve(eventData) {
//     return eventData as unknown as {id:string, name:string, authorId:number}
//   },
//   // resolve(root, args, context, info) {
//   //   return info as {id:String, name:String, authorId:Number}
//   // },
// })
