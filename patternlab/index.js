/**
 * Apply the Design System to Pattern Lab DOM
 */

import $ from 'jquery';
import _ from 'lodash';
import 'atoms/grid';
import 'atoms/image/demo';
import * as homepage from 'pages/homepage';

import designSystem from '../source/design-system';
import './scss/_styleguide.scss';
import './scss/_scss2json.scss';

const $context = $(document);
const settings = {
  enableHolder: BUILD_TARGET === 'pl',
};

_.forEach(designSystem, (component) => {
  console.log(component.name);
  component.enable($context, settings);
});

homepage.enable();
