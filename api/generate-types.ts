import * as inputSchemas from './inputs';
import { z } from 'zod';
import { zodToTs, printNode, createTypeAlias } from 'zod-to-ts';
import { writeFile, mkdir } from 'fs/promises';
import { Project, ScriptTarget } from 'ts-morph';
import { existsSync, rmSync } from 'fs';
import * as dbModels from '@prisma/client';

const WARNING = '// WARNING: Do not change this file manually. Use npm run generate:types from the api project to update it';
const OUTPUT_DIR = '../ui/types';

if (existsSync(`${OUTPUT_DIR}/input`)) {
  rmSync(`${OUTPUT_DIR}/input`, { recursive: true });
}
if (existsSync(`${OUTPUT_DIR}/models`)) {
  rmSync(`${OUTPUT_DIR}/models`, { recursive: true });
}

async function generateInputTypes() {
  const types: any[] = [];
  for (let key of Object.keys(inputSchemas)) {
    const schema = (inputSchemas as any)[key];

    const name = key.replace('Schema', '');
    const tsType = zodToTs(schema as z.Schema);
    const typeAlias = createTypeAlias(tsType.node, name);

    types.push({ name, content: `${WARNING}\n\n export ${printNode(typeAlias)}` });
  }

  await mkdir(`${OUTPUT_DIR}/input`, { recursive: true });

  for (let type of types) {
    console.log('Generated Input:', type.name);
    await writeFile(`${OUTPUT_DIR}/input/${type.name}.ts`, type.content);
  }
}

async function generateModelTypes() {
  const types: any[] = [];
  console.log('keys*******', dbModels);
  for (let key of Object.keys(dbModels)) {
    if (key.endsWith('SelectScalar')) {
      const schema = (dbModels as any)[key];
      console.log('key*******', key);
      console.log('schema*******', schema);

      const name = key.replace('SelectScalar', '');

      types.push({ name, content: `${WARNING}\n\n export ${JSON.stringify(schema, null, 2)}` });
    }
  }

  await mkdir(`${OUTPUT_DIR}/models`, { recursive: true });

  for (let type of types) {
    console.log('Generated Model:', type.name);
    await writeFile(`${OUTPUT_DIR}/models/${type.name}.ts`, type.content);
  }
}

async function generateModelsTypes() {
  const project = new Project({
    compilerOptions: {
      declaration: true,
      target: ScriptTarget.ESNext,
      emitDeclarationOnly: true,
      outDir: `${OUTPUT_DIR}/models`,
    },
  });

  // project.addSourceFilesAtPaths('models/*.ts');

  const sourceFiles = project.getSourceFiles();

  for (let file of sourceFiles) {
    const imports = file.getImportDeclarations();
    for (let imp of imports) {
      if (!imp.isModuleSpecifierRelative()) {
        imp.remove();
      }
    }

    const classes = file.getClasses();
    if (!classes.length) {
      continue;
    }

    for (let cls of classes) {
      console.log('Generated Model:', cls.getName());
      cls.removeExtends();
    }

    await file.emit();
  }
}

generateInputTypes();
generateModelsTypes();
// generateModelTypes();
