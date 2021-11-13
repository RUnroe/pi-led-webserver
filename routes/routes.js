const { spawn } = require('child_process');
const reset = require('./reset');
const allRoutines = require('../routines/routine-manifest');

const { normalizeName, setColor, makeResponse } = require('./helper');

// Clear the LED strip and kill any child processes
const clear = (req, res) => {
    req.app.get('display').kill('SIGINT');
    res.status(201).end();
};

const updateLights = (req, res) => {
    const {
        name, brightness, hex, colorType, r, g, b, delay,
      } = req.query;
  
      // Get RGB value
      const rgb = setColor(hex, colorType, r, g, b);
  
      // Build arguments to be passed into child_process. Also removes uneeded arguments.
      const options = [`-l ${brightness}`, `-r ${rgb.r}`, `-g ${rgb.g}`, `-b ${rgb.b}`, `-d ${delay}`].filter((argument) => argument.search('undefined') === -1);
  
      // Combine arguments and spawns child process
      const args = [allRoutines[normalizeName(name)].path, ...options];
      req.app.set('display', spawn('python', args));
  
      // Send back an object with the settings the client provided
      const response = makeResponse(name, brightness, hex, colorType, r, g, b, delay);
      res.json(response);
}

const routes = [
	{
		uri: '/kill',
		methods: ['delete'],
		handler: [clear]
	},
    {
		uri: '/lights',
		methods: ['put'],
		handler: [reset, updateLights]
	},
	
];


module.exports = { routes };