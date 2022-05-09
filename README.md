# Journal

> > Status: **Active Development**.
>
> An effective tracker and visualizer for your goals.

## Description
<img src="/doc/images/calendar.png" alt="calendar view" width="700"/>

Intuative application, with a responsive design, that allow you to track the progress towards your goals.

## Features

Most Important, it will be **always free**.

## General

- Add Goals to track, a goal can be anything, from an exercise to a habit.

<img src="/doc/images/goal-run-graph.png" alt="Statistics of goal" width="500"/>

- The session is saved in your internal storage of the browser, so if you daily erase your local storage, you will
  daily have to log in, if you don't clean it, you will always log in your session.
- You can visualize the logs, from a general perspective or a goal specific.

<img src="/doc/images/general-overview.png" alt="View of the general interface" heigth="300"/>
<img src="/doc/images/goal-overview.png" alt="View of the goal interface" heigth="300"/>

- You can select the type of the goal, iex: if you want to test your maximun deadlift, it will calculate your relative
  intensity with the Epsley formula, otherwise if your goal is an accumulation goal, like run 80000 mts in 30 days, it
  will calculate the accumulated volume.
- Check an specific day.

<img src="/doc/images/day-overview.png" alt="Day overview" width="300"/>

## Privacy Friendly

- It renders a random picture of a robot for your profile, with a random motivational quote with the author.

<img src="/doc/images/banner.png" alt="banner" width="500"/>

- Your password is first hashed and then stored in the database, protection if the database is hacked or leaked.
- It just ask for your email, we use an email parameter because it seems to be unique,

# Usage

1. Create the user.
2. Add the target goal.
3. Start logging for your goal.

# TODO

- [x] Implement permissions for user or admin in the DB.
- [ ] Add a custom picture for the profile.
- [ ] Implement request permissions with token in the server.
- [ ] Implement request permissions with token in client.
- [ ] Hide redundant parameters in forms when adding a log or goal.
- [ ] Notification / animation if the goal is reached.
- [ ] Restrict logging outside timeframe.
- [ ] Create a documentation section.
