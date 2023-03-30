import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, removeBook } from '../data/books.js';
import { getUserData } from '../util.js';
const detailsTemplate = (book, onDelete) => html`
<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <div class="actions">
        ${book.isOwner ? html`
        <a class="button" href="/details/${book._id}/edit">Edit</a>
        <a class="button" @click="${onDelete}" href="javascript:void(0)">Delete</a>` : null}
        ${book.canLike ? html`<a class="button" href="#">Like</a>` : null}
        ${book.canSeeLikes ? html`
        <div class="likes">
        <img class="hearts" src="/images/heart.png">
        <span id="total-likes">Likes: 0</span>
    </div>` : null}
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`;
export async function detailsPage(ctx){
    const id = ctx.params.id;
    const book = await getById(id);
    const userData = getUserData();
    if(userData && userData._id == book._ownerId){
        book.isOwner = true;
    }
    if(userData && userData._id != book._ownerId){
        book.canLike = true;
    }
    if(!userData || userData && userData._id != book._ownerId){
        book.canSeeLikes = true;
    }
    ctx.render(detailsTemplate(book, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure that you want to delete?');

        if(choice){
            await removeBook(id);
            ctx.page.redirect('/');
        }
    }
}