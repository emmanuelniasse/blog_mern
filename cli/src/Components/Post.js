export default function Post() {
    return (
        <div className="post">
            <div className="image">
                <img src="https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg" alt="" />
            </div>
            <div className="texts">
                <h2>Canapé marron</h2>
                <p className="info">
                <a className="author" href="">Myriam O.</a>
                <time> 11/02/23 00:18</time>
                </p>
                <p className="summary">Vous pouvez assortir votre canapé à des couleurs claires et pastels comme le gris, le beige, le blanc cassé.</p>
            </div>
        </div>
    );
}