function DayCount(currentDateString, eventDateString) {
    // Set the unit values in milliseconds.
    let msecPerMinute = 1000 * 60;
    let msecPerHour = msecPerMinute * 60;
    let msecPerDay = msecPerHour * 24;
  
    // Set a date and get the milliseconds
    let currentDate = new Date(currentDateString); // startDate.setMonth(8);startDate.setDate(8);startDate.setHours(0, 0, 0, 0);
    let eventDate = new Date(eventDateString);
    let currentDateMsec = currentDate.getTime();
    let eventDateMsec = eventDate.getTime();
  
    // Get the difference in milliseconds.
    let interval = eventDateMsec - currentDateMsec;
  
    // many days from the interval to determine the remainder.
    let days = Math.floor(interval / msecPerDay);
    let reminder = interval - (days * msecPerDay);
  
    //Output: xx days
    //the positive number refers to day left
    //the negative number refers day since
    return days;
  }
  
  let days = DayCount('9/7/2021', '8/7/2021');
  
  document.getElementById("interval1").innerHTML = days;

  let events = [];
  events.push(days);

  /* ==========================================================================
   Student's code here
   ========================================================================== */
   
   for (const row of document.querySelectorAll("tr")) {
    let col = row.querySelectorAll("td")

    if(col.length == 0){
      continue
    }

    let days = DayCount('9/7/2021', col[1].innerHTML);

    col[2].innerText = days;

   }
