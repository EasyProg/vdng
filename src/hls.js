const newPlayList =
[
    {EXTINF:'aspect-ratio=4:3;id=51;category=информационный;keycode=1;thumb=https://admin.hls.tv/cdn/logo/746d07c80571189d7d991e6810c9d34d.jpg;type=hls,1+1https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/51/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=53;category=информационный;keycode=2;thumb=https://admin.hls.tv/cdn/logo/6f9f4187f811b38e6dc6b069ea55653a.jpg;type=hls,112 Украинаhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/53/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=54;category=информационный;keycode=3;thumb=https://admin.hls.tv/cdn/logo/d31ea8c4b7e94bb4222676f5f536ff1a.jpg;type=hls,24 (Телеканал новостей 24)https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/54/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=55;category=информационный;keycode=4;thumb=https://admin.hls.tv/cdn/logo/595664221c4c28bc024dd42d52fcfccc.jpg;type=hls,5 каналhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/55/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=56;category=фильмы;keycode=5;thumb=https://admin.hls.tv/cdn/logo/3a451f243356ab0191c32c84c91b7774.jpg;type=hls,Enter-фильмhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/56/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=57;category=многопрофильный;keycode=6;thumb=https://admin.hls.tv/cdn/logo/b3f3066834760a770a5ce844717ce8e5.jpg;type=hls,2+2https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/57/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=62;category=многопрофильный;keycode=7;thumb=https://admin.hls.tv/cdn/logo/bb03d191d928bbdccbf193b23cffc829.jpg;type=hls,ATRhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/62/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=72;category=развлекательный;keycode=8;thumb=https://admin.hls.tv/cdn/logo/1a6631a2e5479e1af2388932a56f829a.jpg;type=hls,HDFASHIONhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/72/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=73;category=многопрофильный;keycode=9;thumb=https://admin.hls.tv/cdn/logo/fe3dfeeedc1e169d43a805d1fd4bbf82.jpg;type=hls,ICTVhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/73/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=75;category=развлекательный;keycode=10;thumb=https://admin.hls.tv/cdn/logo/d9a53c2c7f15d5c563926a225a08a927.jpg;type=hls,Maxxi-TVhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/75/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=76;category=музыкальный;keycode=11;thumb=https://admin.hls.tv/cdn/logo/9d5a69980a2b6c81032d26701bfc8610.jpg;type=hls,MusicBox UAhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/76/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=77;category=информационный;keycode=12;thumb=https://admin.hls.tv/cdn/logo/c0bd1866e047b67450e84ed712edc0f1.jpg;type=hls,NewsOnehttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/77/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=80;category=детский;keycode=13;thumb=https://admin.hls.tv/cdn/logo/f81a1d37b9f28f68e5e389fd09fc5608.jpg;type=hls,QTVhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/80/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=88;category=развлекательный;keycode=14;thumb=https://admin.hls.tv/cdn/logo/8175ed43461fbfd2a5a594f2e038af02.jpg;type=hls,Shopping TVhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/88/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=94;category=развлекательный;keycode=15;thumb=https://admin.hls.tv/cdn/logo/a4f8189ceda325811411bab99e0e93ee.jpg;type=hls,Zoomhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/94/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=101;category=информационный;keycode=16;thumb=https://admin.hls.tv/cdn/logo/8e98ebb460f6445f65579dd804ff3d8e.jpg;type=hls,Гласhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/101/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=108;category=информационный;keycode=17;thumb=https://admin.hls.tv/cdn/logo/448d545723fae4858adec61b9958b88a.jpg;type=hls,Espreso TVhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/108/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=110;category=многопрофильный;keycode=18;thumb=https://admin.hls.tv/cdn/logo/53b082cfbd89a08d0eabb48345c37120.jpg;type=hls,Интерhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/110/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=113;category=развлекательный;keycode=19;thumb=https://admin.hls.tv/cdn/logo/8b6a6dc1bba6bb9a378b5e21cf652113.jpg;type=hls,К1https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/113/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=114;category=развлекательный;keycode=20;thumb=https://admin.hls.tv/cdn/logo/c7fc17559c905f2c123a8628fbf232f3.jpg;type=hls,К2https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/114/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=115;category=многопрофильный;keycode=21;thumb=https://admin.hls.tv/cdn/logo/ea6378a5f2589dbfbc3097368bfe728d.jpg;type=hls,Киевhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/115/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=117;category=познавательный;keycode=22;thumb=https://admin.hls.tv/cdn/logo/988c358511e241150f2c0bc2757e4e0f.jpg;type=hls,Культура (Украина)https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/117/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=119;category=музыкальный;keycode=23;thumb=https://admin.hls.tv/cdn/logo/efdcf7ab306533633f9ebd6157b28a98.jpg;type=hls,M1https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/119/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=120;category=музыкальный;keycode=24;thumb=https://admin.hls.tv/cdn/logo/b2b4c052d730a8b48dedfbb5816fd674.jpg;type=hls,M2https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/120/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=121;category=детский;keycode=25;thumb=https://admin.hls.tv/cdn/logo/d7cedb8f19c701db6569289e9e50e27f.jpg;type=hls,Малятко TVhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/121/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=123;category=развлекательный;keycode=26;thumb=https://admin.hls.tv/cdn/logo/35b63f411e899c3ef6c35c5936cca140.jpg;type=hls,Мегаhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/123/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=125;category=познавательный;keycode=27;thumb=https://admin.hls.tv/cdn/logo/a8f06444052933e4822b5ed97f039e13.jpg;type=hls,Надіяhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/125/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=127;category=развлекательный;keycode=28;thumb=https://admin.hls.tv/cdn/logo/fcc7c38972f3e096dd757e1223222a74.jpg;type=hls,Новый каналhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/127/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=129;category=многопрофильный;keycode=29;thumb=https://admin.hls.tv/cdn/logo/af8d7f2206b22135795de7ff99eaf69b.jpg;type=hls,НТНhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/129/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=132;category=информационный;keycode=30;thumb=https://admin.hls.tv/cdn/logo/d72adca78777b2d94cdb7a5ffd259e7f.jpg;type=hls,Первый деловойhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/132/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=135;category=детский;keycode=31;thumb=https://admin.hls.tv/cdn/logo/d24cde615b2442045b82ddf3fa92bd47.jpg;type=hls,Пиксельhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/135/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=136;category=детский;keycode=32;thumb=https://admin.hls.tv/cdn/logo/e20c7c898e930f484e420d68a04a7689.jpg;type=hls,ПлюсПлюсhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/136/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=139;category=информационный;keycode=33;thumb=https://admin.hls.tv/cdn/logo/b0f90ba092ca87e45f787f839558b534.jpg;type=hls,Радаhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/139/stream.m3u8'},
    {EXTINF:'aspect-ratio=4:3;id=141;category=развлекательный;keycode=34;thumb=https://admin.hls.tv/cdn/logo/95a429f195a8a63949d47183483d165c.jpg;type=hls,Сонцеhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/141/stream.m3u8'},
];
export default newPlayList;

// const playList = [{ EXTINF:
//     { 'aspect-ratio': '4:3;id=51;category=информационный;keycode=1;thumb=https://admin.hls.tv/cdn/logo/746d07c80571189d7d991e6810c9d34d.jpg;type=hls',
//         '1+1': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/51/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=54;category=информационный;keycode=2;thumb=https://admin.hls.tv/cdn/logo/d31ea8c4b7e94bb4222676f5f536ff1a.jpg;type=hls',
//             '24 (Телеканал новостей 24)': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/54/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=55;category=информационный;keycode=3;thumb=https://admin.hls.tv/cdn/logo/595664221c4c28bc024dd42d52fcfccc.jpg;type=hls',
//             '5 канал': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/55/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=205;category=развлекательный;keycode=4;thumb=https://admin.hls.tv/cdn/logo/fc507f5234852b73148bbcef7b53aa1e.jpg;type=hls',
//             'Discovery HD Showcase': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/205/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=56;category=фильмы;keycode=5;thumb=https://admin.hls.tv/cdn/logo/3a451f243356ab0191c32c84c91b7774.jpg;type=hls',
//             'Enter-фильм': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/56/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=73;category=многопрофильный;keycode=6;thumb=https://admin.hls.tv/cdn/logo/fe3dfeeedc1e169d43a805d1fd4bbf82.jpg;type=hls',
//             ICTV: undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/73/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=76;category=музыкальный;keycode=7;thumb=https://admin.hls.tv/cdn/logo/9d5a69980a2b6c81032d26701bfc8610.jpg;type=hls',
//             'MusicBox UA': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/76/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=80;category=детский;keycode=8;thumb=https://admin.hls.tv/cdn/logo/f81a1d37b9f28f68e5e389fd09fc5608.jpg;type=hls',
//             QTV: undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/80/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=3303;category=информационный;keycode=9;thumb=https://admin.hls.tv/cdn/logo/d31021df52e082a8d277cdc455ab8bea.jpg;type=hls',
//             'TEST CUVID': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/3303/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=310;category=фильмы;keycode=10;thumb=https://admin.hls.tv/cdn/logo/31d547df6a5643a37a6d45eb14dcaad8.jpg;type=hls',
//             'TV1000 Comedy HD Bla bla bla': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/310/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=315;category=фильмы;keycode=11;thumb=https://admin.hls.tv/cdn/logo/7883183b35d97eb30c65fcdab8c57222.jpg;type=hls',
//             'TV1000 Premium HD': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/315/stream.m3u8',
//     { EXTINF:
//         { 'aspect-ratio': '4:3;id=145;category=информационный;keycode=12;thumb=https://admin.hls.tv/cdn/logo/1237737579d2abb4584a20dc380120ea.jpg;type=hls',
//             'СТБ': undefined } },
//     'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/145/stream.m3u8' ];
//
//
// export default playList;