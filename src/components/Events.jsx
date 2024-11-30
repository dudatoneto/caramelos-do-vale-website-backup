import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const fetchEvents = async () => {
  const supabaseConnection = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const { data, error } = await supabaseConnection
    .from("events")
    .select("*")
    .order("order", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Error fetching from events table", error);
    return {};
  } else {
    console.log("Successfuly retrieved data");
    return data;
  }
};

const eventParsing = (event) => {
  // Skip parsing if already parsed
  if (event.isParsed) return;

  if (typeof event.information === "string") {
    event.information = event.information.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
    event.isParsed = true; // Mark as parsed
  }
};

const separateEvents = (events) => {
  const active = [];
  const ended = [];

  for (const event of events) {
    (event.ended ? ended : active).push(event);
  }

  return [active, ended];
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [endedEvents, setEndedEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };

    loadEvents();
  }, []);

  useEffect(() => {
    let [active, ended] = separateEvents(events);
    active.forEach((event) => eventParsing(event));
    ended.forEach((event) => eventParsing(event));
    setActiveEvents(active);
    setEndedEvents(ended);
  }, [events]);

  return (
    <main>
      <section>
        <h1>Agenda de Eventos</h1>
      </section>
      <section className="events">
        <h2 className="small-margin">Próximos/Em Andamento</h2>
        {activeEvents.length ? (
          activeEvents.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })
        ) : (
          <p>Não há eventos planejados</p>
        )}
      </section>
      <section className="events">
        <h2 className="small-margin">Últimos eventos</h2>
        {endedEvents.length ? (
          endedEvents.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })
        ) : (
          <p>Não há eventos passados</p>
        )}
      </section>
    </main>
  );
};

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img className="img-event" src={event.img_link} />
      <div className="event-information">
        <h2>{event.name}</h2>
        <p>{event.information}</p>
        {event.has_button ? (
          <a
            className="button-secondary xsmall-margin"
            target="_blank"
            rel="noopener noreferrer"
            href={event.button_link}
          >
            {event.button_text}
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Events;
