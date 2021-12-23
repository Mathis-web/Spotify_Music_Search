function Track({name, artists, uri, img, onClickTrack}) {

    return(
        <div className="tracks-list__track" onClick={() => onClickTrack(uri)}>
            <img src={img.url} style={{height: `${img.height}px`}} alt="" />
            <div className="tracks-list__track__content">
                <p className="tracks-list__track__content__name">{name}</p>
                <p className="tracks-list__track__content__artists">
                    {artists.map(artist => artist.name).join(' - ')}
                </p>
            </div>
        </div>
    );
}

export default Track;