import React from "react";

const Map = () => {
  return (
    <section className="section-padding bg-petio-gray/10">
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Find Us On The Map
        </h2>
        <div className="h-[400px] rounded-lg overflow-hidden border border-petio-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30594994064!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1652813905575!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Petio Store Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Map;
