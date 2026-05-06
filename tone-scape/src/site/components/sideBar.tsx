export default function Sidebar() {
  return (
    <aside
      className="bg-dark text-light border-end border-secondary p-3"
      style={{ width: "280px" }}
    >
      <h5 className="mb-3">Scene</h5>

      <div className="d-grid gap-2">
        <button className="btn btn-outline-light btn-sm text-start">
          + Add Object
        </button>

        <button className="btn btn-outline-light btn-sm text-start">
          Background Settings
        </button>

        <button className="btn btn-outline-light btn-sm text-start">
          Camera Settings
        </button>

        <button className="btn btn-outline-light btn-sm text-start">
          Lighting
        </button>

        <button className="btn btn-outline-light btn-sm text-start">
          Materials
        </button>

        <button className="btn btn-outline-light btn-sm text-start">
          Shaders
        </button>

        <button className="btn btn-outline-light btn-sm text-start">
          Import Skybox
        </button>
      </div>

      <hr className="border-secondary" />

      <small className="text-secondary">
        Drag & drop models into the viewport
      </small>
    </aside>
  );
}
