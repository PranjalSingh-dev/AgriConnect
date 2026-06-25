import { useState } from "react";
import { Button, Input, Modal, Toast, Loader } from "../components/ui";

function Showcase() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">
        UI Components Showcase
      </h1>

      <Button
        text="Open Modal"
        onClick={() => setShowModal(true)}
      />

      <Input placeholder="Enter Name" />

      <Loader />

      <Button
        text="Show Toast"
        onClick={() => setShowToast(true)}
      />

      {showToast && (
        <Toast message="Toast Working!" />
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <h2>Modal Working!</h2>
      </Modal>

    </div>
  );
}

export default Showcase;