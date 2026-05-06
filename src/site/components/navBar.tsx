import { HeartHandshake } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark px-3 border-bottom border-secondary">
            <span className="navbar-brand mb-0 h1">3D Scene Viewer</span>

            <div className="d-flex gap-2">
                <button className="btn btn-outline-light btn-sm">
                    Import Model
                </button>

                <button className="btn btn-outline-info btn-sm">Export</button>

                <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                    <HeartHandshake size={16} />
                    Contribute
                </button>
            </div>
        </nav>
    );
}
