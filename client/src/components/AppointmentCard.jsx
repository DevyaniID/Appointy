// AppointmentCard.jsx
function AppointmentCard({ appointment }) {
  const { service_type, provider_name, date, time, status } = appointment;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{service_type} with {provider_name}</h5>
        <p className="card-text">
          {date} at {time} <br />
          Status: <strong>{status}</strong>
        </p>
      </div>
    </div>
  );
}

export default AppointmentCard;
