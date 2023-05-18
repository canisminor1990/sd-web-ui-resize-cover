import cliui from 'cliui';
import { IFlags } from '../constants/flags.js';

export default (flagsConst: IFlags) => {
  // @ts-ignore
  const ui = cliui();
  const flags: any = {};
  const options = Object.entries(flagsConst)
    .map((item) => {
      if (!item[1].desc) return '';
      flags[item[0]] = {
        shortFlag: item[1].shortFlag,
        type: item[1].type,
      };
      if (!item[1].shortFlag) return `--${item[0]}\t ${item[1].desc}`;
      return `--${item[0]}, -${item[1].shortFlag}\t ${item[1].desc}`;
    })
    .filter(Boolean)
    .join('\n');

  ui.div({
    text: 'Usage',
    padding: [1, 0, 0, 0],
  });

  ui.div({
    text: '$ cover-minifier [option] [command]',
    padding: [0, 0, 0, 4],
  });

  ui.div({
    text: 'Options',
    padding: [1, 0, 0, 0],
  });

  ui.div({
    text: options,
    width: 1000,
    padding: [0, 0, 0, 4],
  });

  return {
    help: ui.toString(),
    flags,
  };
};
