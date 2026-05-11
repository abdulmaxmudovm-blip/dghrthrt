/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CosmicBackground from "./components/CosmicBackground";
import WordGame from "./components/WordGame";

export default function App() {
  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-auto py-12">
      <CosmicBackground />
      <WordGame />
    </main>
  );
}
