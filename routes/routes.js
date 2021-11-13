const { spawn } = require('child_process');
const allRoutines = require('../routines/routine-manifest');

const { normalizeName, setColor, makeResponse } = require('./helper');



function reset(req, res, next) {
    const clear = new Promise((resolve) => {
      const display = req.app.get('display');
  
      // If child process has not exited yet
      if (display.exitCode == null) {
        // Send kill signal
        display.kill('SIGINT');
  
        // Resolve promise when child process dies... like real life
        display.on('close', resolve);
      } else {
        resolve();
      }
    });
    // Move along now
    clear.then(() => next());
  }



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

const frontend = (req, res) => {
    res.send("Hello RBGTQ world");
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
    {
		uri: '/lights',
		methods: ['get'],
		handler: [frontend]
	},
	
];


module.exports = { routes };