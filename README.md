## What kind of insurance claim is this focused on?
Motor insurance products - _mostly car insurance_.

## How it works
I'm following the steps outlined [here](https://mtek-services.com/knowledge-base/how-to-make-a-motor-vehicle-accident-or-damage-claim/). Since media isn't adequately supported for SMS & USSD, they'll only accept text inputs. For illustrative purposes, I've seeded the database with 5 dummy/test users (Their details are in ).
When you contact our service, you'll need to provide a membership id. Ideally this step isn't necessary cause we'd _maybe_ have the registered phone numbers of our users/customers.

## Our Telegram bot?
Find it here [@claim_motor_insurance_bot](http://t.me/claim_motor_insurance_bot)

## Africa's Talking Simulator (for SMS, and USSD)
To test out: visit [Africa's Talking Simulator](https://simulator.africastalking.com:1517/)  
USSD Dial Code: \*384\*25447#  
SMS: 25446  

## Our API & Frontend
* API: [incourage-insurer](https://incourage-insurer.herokuapp.com/)  
* Frontend: [see-insurance-claims](https://see-insurance-claims.netlify.app/)  
    * GitHub repo for the [frontend app](https://github.com/wachukxs/see-insure-claims)

## Resources
* Should I use both Africa'sTalking, and Twillo?
* Using [LocalTunnel](https://localtunnel.github.io/www/), not ngrok :)


## Set heroku configs
```heroku config:set CONFIG_VAR_NAME=var_value -a appName```

## From dev/local env to the world
```lt --port <PORT>```

## Delibrations
* Should we have an interface that'll help insurance agents see the claims that have been made?
    * Yes! Improvements.
* Should we include data validation?
    * Yes!, especially for user inputs!
* Do we need API documentation?
    * Yes, just enough at least.