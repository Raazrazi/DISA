import '../styles/Banner.css'

const Banner = () => {
    return (
        <div className='banner'>
            <div className="content">
                <h1 className='title'>How are you?</h1>

                <div className="banner_button">
                    <button className="goto">Go to</button>
                </div>
                <h1 className="description">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet</h1>
            </div>
            <div className="fade"></div>

        </div>
    )
}

export default Banner