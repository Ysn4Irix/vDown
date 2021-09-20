# vDown

An video/photo downloader API for tiktok,instagram,youtube,dailymotion build with [NodeJS](https://nodejs.org)

## Installation

API requires [Node.js](https://nodejs.org/) v15+ to run.

Install the dependencies and start the production.

```sh
cd vdown
npm install
npm start or npm run devStart
```

## Usage
### Tiktok
Downlaod a sinlge tiktok video
```endpoint
POST /api/v1/tiktok
```
#### Example request body

```json
{
  "url": "https://www.tiktok.com/@kylethomas/video/6985835266170801413",
}
```
#### Example response

```json
{
  "status": "success",
  "headers": {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    "cookie": "tt_webid_v2=6944735531582408342; ttwid=1|crU-JLT5sGMw7om4VQdqlna-YFl4W7OKMthr6lN0TnI|1632157694|5cf89f5bead69bfd44edce254185547bc000ecc2fffb4b0f3d89218ca36a7bbf; tt_webid=6944735531582408342; tt_csrf_token=WansLw5C2sso0MUlwJS1D-8d"
  },
  "id": "6668168694621028357",
  "username": "kylethomas",
  "name": "kyle thomas ✌️",
  "profilePic": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/203d6cdf5c9bb0c8e91a2fd83b0633da~c5_1080x1080.jpeg?x-expires=1632243600&x-signature=W2tQaRJjPfpkxBKVk2BqpG7qG9M%3D",
  "following": 2507,
  "followers": 30000000,
  "likes": 1400000000,
  "totalVideos": 8748,
  "verified": true,
  "private": false,
  "description": "im ready to go back to moscow ✈️ draft",
  "thumbnail": "https://p77-sign-sg.tiktokcdn.com/obj/tos-alisg-p-0037/7aadd261674f494c909a49446e0c5dd4?x-expires=1632178800&x-signature=dZR9NiOU6sNlKmbQ5p8jYykIRAY%3D",
  "format": "720p",
  "urlDownload": "https://v16-web.tiktok.com/video/tos/alisg/tos-alisg-pve-0037c001/97a2602a6ac14b2c812d92083117d800/?a=1988&br=3666&bt=1833&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1632179303&ft=9wMeRexI4kag3&l=20210920170814010245015153458BD196&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=3&qs=0&rc=amQ6dGQ6ZmRkNjMzODczNEApOWlkZzZmNDxoNzVpNzs6Z2djXmdwcjRfbG1gLS1kMS1zc2NgNDA1NS5gNTAzNWI0MjE6Yw%3D%3D&signature=103caf670bc116f0ac030e6f14a3c7c5&tk=0&vl=&vr="
}
```
### Instagram
Downlaod an Instagram post
```endpoint
POST /api/v1/instagram
```
#### Example request body
```json
{
  "url": "https://www.instagram.com/p/CUC-nMbMCjL/",
}
```
#### Example response

```json
{
  "status": "success",
  "postType": "SingleImage",
  "displayUrl": "https://instagram.frak2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/242338240_535059044245964_4865423514810706670_n.jpg?_nc_ht=instagram.frak2-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=oVxcNBbcig8AX--wZwm&edm=AABBvjUBAAAA&ccb=7-4&oh=7831d184edf3f266c656155c1c22f7ac&oe=614FF4D4&_nc_sid=83d603",
  "caption": "Produktplatzierung nAmazing shot by: @carsthatlookneat",
  "owner": "f1mike28",
  "is_verified": false,
  "profile_pic": "https://instagram.frak2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/11887161_435960986528946_1725078305_a.jpg?_nc_ht=instagram.frak2-1.fna.fbcdn.net&_nc_ohc=157SmdOp5rQAX9yThpz&edm=AABBvjUBAAAA&ccb=7-4&oh=78c4f641e931cbe0bd99c90e4ce1f669&oe=61505DAF&_nc_sid=83d603",
  "full_name": "Michael Kübler",
  "is_private": false,
  "total_media": 3971,
  "hashtags": null,
  "dataDownload": "https://instagram.frak2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/242338240_535059044245964_4865423514810706670_n.jpg?_nc_ht=instagram.frak2-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=oVxcNBbcig8AX--wZwm&edm=AABBvjUBAAAA&ccb=7-4&oh=7831d184edf3f266c656155c1c22f7ac&oe=614FF4D4&_nc_sid=83d603"
}
```
### Youtube
Downlaod a Youtube Video with different formats
```endpoint
POST /api/v1/youtube
```
#### Example request body
```json
{
  "url": "https://www.youtube.com/watch?v=ukzFI9rgwfU",
}
```
#### Example response

```json
{
    A lot of data :-D
}
```

### Dailymotion
Downlaod a Dailymotion Video with different formats
```endpoint
POST /api/v1/dailymotion
```
#### Example request body
```json
{
  "url": "https://www.dailymotion.com/video/x84b6xb?playlist=x6pibu",
}
```
#### Example response

```json
{
  "status": "Success",
  "extension": "mp4",
  "format": 1080,
  "description": "Novak Djokovic won his 20th grand slam this year, drawing level with both Roger Federer and Rafael Nadal.",
  "uploader": "beIN SPORTS MENA",
  "thumbnail": "https://s1.dmcdn.net/v/TGvlF1XIBqU3B2DtS/x1080",
  "urlDownload": "https://proxy-025.ix7.dailymotion.com/sec(zUiVymST0DWF2IpU0UHfRMJrW3p5ns9lJdOI5SiojTLgsnB2SSxIc7MsdvvIeanqi9A1baY3HmQMxPlHQLGHMA)/video/360/079/490970063_mp4_h264_aac_fhd.mp4"
}
```

## License

MIT