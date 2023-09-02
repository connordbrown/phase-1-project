# Digipedia

Digipedia is a front-end application for looking up and liking your favorite Digimon!

## Operation

Use the API simulator [json-server](https://www.npmjs.com/package/json-server) to run the application's back-end.

```bash
json-server --watch db.json
```
Then, open the HTML file in the browser:
```bash
open index.html
```

## Usage

When the page loads, the user will see a Digimon card, followed by a list of Digimon, followed by a 'Add a New Digimon' form. The user can scroll through the list of Digimon and select one to view using the 'view' button. The Digimon's name, image, and level will be displayed in the Digimon card at the top of the application. Digimon can be filtered by level using the 'Filter Digimon By Level' dropdown above the list. New Digimon can be added using the provided 'Add a New Digimon' form. Any Digimon can be 'liked' using the 'like' button.


<img src="https://github.com/connordbrown/phase-1-project/blob/main/phase-1-project.gif" width="400" height="700" loop=infinite />


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## Authors and Acknowledgement

The original application was designed and built by Connor D. Brown in 2023.

This application uses modified data from the [Digimon API](https://digimon-api.vercel.app/). The original API was created by Shadow Smith.  