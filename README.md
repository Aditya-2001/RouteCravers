# Routecravers
Routecravers is a web portal which provides users a choice to book bus tickets.
Users just need to login and they can book bus tickets. It also provides also services such as getting all bus information, ticket fare auto calculate, searching buses between 2 stops, auto-cancellation of tickets.
There is also a backend side where staff can add bus details and routes, manage ticket cancellation and refund, manage tickets booked and customers.


How to install project (For developers only):<br>
  1.) Install python3 , pip3 and django<br>
  2.) pip install -r requirements.txt<br>
  3.) If any package gives error while installing then install it manually.<br>
  4.) Open project location in cmd / terminal.<br>
  5.) Now cd RouteCravers/RouteCravers<br>
  6.) In settings.py change debug mode to True for changing code for awesome updations only.<br>
  7.) Project will be successfully installed, run python manage.py runserver   or   py manage.py runserver to run project.<br>
  8.) Also run python3 manage.py process_tasks while ticket booking
<br><br>
How to push project:<br>
  1.) After changing the code section , change debug mode to False.<br>
  2.) Now run python manage.py collectstatic.<br>
  3.) Now run ur push command as usual.<br>

Note: The app we deployed on heroku runs on free account so it do not provide background activity server , this means ticket cancellation process at that side would be somewhat with difficulty and with improper logic. If you had cloned the project and want to deploy then make sure python3 manage.py process_tasks runs in the background. Refer to https://devcenter.heroku.com/articles/clock-processes-python for heroku premium account.

# Table link for Database Idea : https://docs.google.com/spreadsheets/d/1k9CjzdXV1tRXfn1R7zYh00Zx043nO6h-St_OMbmgbFs/edit?usp=sharing
