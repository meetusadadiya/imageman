# Server-side Image Manipulator

## Fetch pre-scaled image from server. Reducing bandwidth for client and server both.

**Author:** Meet Usadadiya

**How it works:**

![Diagram](https://i.ibb.co/BC4S4fz/Diagram.png)

**Client-Side Demo:**

![Demo](https://user-images.githubusercontent.com/23379240/78450603-684c5f00-769d-11ea-8d4f-aa971882e653.gif)

## Applications

This tool is useful when creating responsive site. This tool can helpful with **img** tag using **srcset** attribute:

```html
<img
	srcset="
		http://url/img/meet.jpg?width=480 480w,
		http://url/img/meet.jpg?width=800 800w
	"
	sizes="(max-width: 600px) 480px,
            800px"
	src="http://url/img/meet.jpg?width=800"
	alt="Meet"
/>
```

### Commands :

**Start :**  
**`npm start`**  
And this tool will start running on port 3000.

**Run on Custom Port:**  
**`npm start port 1234`**  
To run this tool on custom port, you have to specify port number using port argument.

**Clean Cache:**  
**`npm clean-cache`**  
This command will clear all cached images.

## Setup Instructions:

1. Clone this repository.
2. Install Dependencies using **`npm install`** or **`yarn install`**
3. Run server by using **`npm start`** or **`yarn start`**
4. Use following API to save images on server:
    - **Method**: POST
    - **URL** : `/upload`
    - **Body Content-Type**: multipart/form-data
    - **Field 1 Name**: file
    - **Value**: _an image-file_
    - **Header Name:** name
    - **Header Value**: An Image name to be on server
5. Or you can just place images in `./public/img` folder

This will work with **JPEG, PNG** and **SVG** formats only.
More features are coming soon....

PRs and Issues are welcomed.
Thank You!
