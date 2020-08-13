```jsx
import { useState } from "react";
const [isOpen, setIsOpen] = useState(false);

<div>
  <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
    Basic Modal Example
  </button>
  <GroupsModal
    header={"This is the modal"}
    onClose={() => setIsOpen(false)}
    shown={isOpen}
    centered="true"
    body={"Are you sure you want to delete this post?"}
  />
</div>;
```
